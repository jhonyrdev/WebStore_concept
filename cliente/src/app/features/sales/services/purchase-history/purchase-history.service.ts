import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '@/app/core/services/api/api.service';
import { ApiResponse } from '@/app/core/models/api-response';
import { CartItem } from '@/app/features/cart/models/cart-Item.model';
import jsPDF from 'jspdf';

type TipoComprobante = 'BOLETA' | 'FACTURA';

export interface PurchaseHistoryItem {
  productId: number | null;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface PurchaseHistoryRecord {
  id: string;
  fecha: string;
  hora: string;
  clienteNombre: string;
  clienteEmail: string;
  metodoPago: string;
  tipoComprobante: string;
  items: PurchaseHistoryItem[];
  subtotal: number;
  igv: number;
  total: number;
  estado: string;
}

export interface CreatePurchaseReportInput {
  metodoPagoId: number;
  tipoComprobante?: TipoComprobante | 'BOLETA' | 'FACTURA';
  items: CartItem[];
}

interface CheckoutItemPayload {
  productoId: number;
  cantidad: number;
}

interface CheckoutRequestPayload {
  metodoPagoId: number;
  tipoComprobante: TipoComprobante | 'BOLETA' | 'FACTURA';
  items: CheckoutItemPayload[];
}

interface DetalleVentaResponse {
  productoId: number | null;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

interface VentaReportResponse {
  idVenta: number;
  fecha: string;
  hora: string;
  clienteNombre: string;
  clienteCorreo: string;
  metodoPago: string;
  tipoComprobante: string;
  subtotal: number;
  igv: number;
  total: number;
  estado: string;
  items: DetalleVentaResponse[];
}

// ─── Paleta Tambito ───────────────────────────────────────────
const COLOR_PURPLE   = '#8B1FA8';
const COLOR_GOLD     = '#FFD700';
const COLOR_GOLD_TXT = '#6A0080';
const COLOR_GREEN    = '#4CAF50';
const COLOR_WHITE    = '#FFFFFF';
const COLOR_LIGHT_BG = '#fdf5ff';
const COLOR_DIVIDER  = '#e0c0f0';
const COLOR_MUTED    = '#888888';
const COLOR_TEXT     = '#333333';

@Injectable({
  providedIn: 'root',
})
export class PurchaseHistoryService {
  private readonly API = 'api/ventas';

  private historySignal = signal<PurchaseHistoryRecord[]>([]);

  readonly history = this.historySignal.asReadonly();

  constructor(private readonly api: ApiService) {}

  createReport(input: CreatePurchaseReportInput): Observable<PurchaseHistoryRecord> {
    const payload: CheckoutRequestPayload = {
      metodoPagoId: input.metodoPagoId,
      tipoComprobante: input.tipoComprobante ?? 'BOLETA',
      items: input.items.map((item) => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
      })),
    };

    return this.api
      .post<ApiResponse<VentaReportResponse>, CheckoutRequestPayload>(`${this.API}/checkout`, payload)
      .pipe(
        map((response) => this.mapReport(response.data)),
        tap((report) => this.upsertReport(report)),
      );
  }

  loadHistory(): Observable<PurchaseHistoryRecord[]> {
    return this.api.get<ApiResponse<VentaReportResponse[]>>(`${this.API}/mis-compras`).pipe(
      map((response) => (response.data ?? []).map((report) => this.mapReport(report))),
      tap((reports) => this.historySignal.set(reports)),
    );
  }

  getByClient(_clientKey: string): PurchaseHistoryRecord[] {
    return this.historySignal();
  }

  getById(id: string): PurchaseHistoryRecord | null {
    return this.historySignal().find((record) => record.id === id) ?? null;
  }

  descargarPdf(reporte: PurchaseHistoryRecord): void {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    this.buildStyledPdf(doc, reporte);
    doc.save(`${this.buildFileName(reporte)}.pdf`);
  }

  // ─── PDF con diseño Tambito ──────────────────────────────────

  private buildStyledPdf(doc: jsPDF, reporte: PurchaseHistoryRecord): void {
    const W      = doc.internal.pageSize.getWidth();   // 595.28 pt
    const margin = 48;
    const inner  = W - margin * 2;

    let y = 0;

    // ── Header morado ──────────────────────────────────────────
    const headerH = 110;
    doc.setFillColor(COLOR_PURPLE);
    doc.rect(0, 0, W, headerH, 'F');

    // Logo TAMBITO
    doc.setTextColor(COLOR_GOLD);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30);
    doc.text('TAMBITO', margin, 44);

    // Subtítulo
    doc.setTextColor('#e0a0f0');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('COMPROBANTE DE COMPRA', margin, 60);

    // Badge tipo comprobante (fondo dorado)
    const badgeTxt = reporte.tipoComprobante.toUpperCase();
    doc.setFillColor(COLOR_GOLD);
    doc.roundedRect(margin, 72, 60, 16, 4, 4, 'F');
    doc.setTextColor(COLOR_GOLD_TXT);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(badgeTxt, margin + 6, 83.5);

    // Badge estado (fondo verde)
    doc.setFillColor(COLOR_GREEN);
    doc.roundedRect(margin + 68, 72, 60, 16, 4, 4, 'F');
    doc.setTextColor(COLOR_WHITE);
    doc.setFontSize(9);
    doc.text(reporte.estado.toUpperCase(), margin + 74, 83.5);

    y = headerH + 20;

    // ── N.º y fecha ────────────────────────────────────────────
    this.drawRow(doc, margin, y, inner, 'N.º de compra', `#${reporte.id}`, true);
    y += 22;
    this.drawRow(doc, margin, y, inner, 'Fecha', this.formatPdfDate(reporte));
    y += 22;

    this.drawDivider(doc, margin, y, inner);
    y += 14;

    // ── Datos del cliente ──────────────────────────────────────
    this.drawRow(doc, margin, y, inner, 'Cliente', reporte.clienteNombre);
    y += 22;
    this.drawRow(doc, margin, y, inner, 'Correo', reporte.clienteEmail);
    y += 22;
    this.drawRow(doc, margin, y, inner, 'Metodo de pago', reporte.metodoPago);
    y += 22;

    this.drawDivider(doc, margin, y, inner);
    y += 14;

    // ── Cabecera tabla de items ────────────────────────────────
    doc.setFillColor('#f0e0f8');
    doc.rect(margin, y, inner, 18, 'F');
    doc.setTextColor(COLOR_PURPLE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('PRODUCTO',  margin + 6,       y + 12);
    doc.text('CANT.',     margin + inner - 100, y + 12);
    doc.text('SUBTOTAL',  margin + inner - 46,  y + 12);
    y += 24;

    // ── Filas de items ─────────────────────────────────────────
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    reporte.items.forEach((item, i) => {
      if (i % 2 === 0) {
        doc.setFillColor('#faf0fc');
        doc.rect(margin, y - 4, inner, 18, 'F');
      }

      // Nombre (con wrap si es largo)
      const maxNombreW = inner - 120;
      const nombreLines = doc.splitTextToSize(item.nombre, maxNombreW);
      doc.setTextColor(COLOR_TEXT);
      doc.text(nombreLines[0], margin + 6, y + 9);

      doc.setTextColor(COLOR_PURPLE);
      doc.setFont('helvetica', 'bold');
      doc.text(`x${item.cantidad}`, margin + inner - 100, y + 9);

      doc.setTextColor(COLOR_TEXT);
      doc.setFont('helvetica', 'normal');
      doc.text(`S/ ${item.subtotal.toFixed(2)}`, margin + inner - 46, y + 9);

      y += 20;

      // Si había más líneas de nombre, imprímelas
      for (let l = 1; l < nombreLines.length; l++) {
        doc.setTextColor(COLOR_TEXT);
        doc.text(nombreLines[l], margin + 6, y + 9);
        y += 14;
      }
    });

    y += 6;
    this.drawDivider(doc, margin, y, inner);
    y += 16;

    // ── Subtotales ─────────────────────────────────────────────
    this.drawRow(doc, margin, y, inner, 'Subtotal', `S/ ${reporte.subtotal.toFixed(2)}`);
    y += 20;
    this.drawRow(doc, margin, y, inner, 'IGV (18%)', `S/ ${reporte.igv.toFixed(2)}`);
    y += 20;

    // ── Barra total final ──────────────────────────────────────
    const totalBarH = 32;
    doc.setFillColor(COLOR_PURPLE);
    doc.rect(margin, y + 8, inner, totalBarH, 'F');

    doc.setTextColor(COLOR_GOLD);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('TOTAL', margin + 10, y + 28);
    doc.text(`S/ ${reporte.total.toFixed(2)}`, margin + inner - 6, y + 28, { align: 'right' });

    y += totalBarH + 20;

    // ── Footer ─────────────────────────────────────────────────
    const footerH = 40;
    doc.setFillColor(COLOR_LIGHT_BG);
    doc.rect(margin, y, inner, footerH, 'F');

    doc.setTextColor('#a060c0');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Este documento es un comprobante electronico de pago.', W / 2, y + 14, { align: 'center' });

    doc.setTextColor(COLOR_PURPLE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('¡Gracias por tu compra en Tambito!', W / 2, y + 30, { align: 'center' });
  }

  private drawRow(
    doc: jsPDF,
    x: number,
    y: number,
    width: number,
    label: string,
    value: string,
    valueAccent = false,
  ): void {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(COLOR_MUTED);
    doc.text(label, x, y);

    doc.setFont('helvetica', valueAccent ? 'bold' : 'normal');
    doc.setFontSize(valueAccent ? 14 : 10);
    doc.setTextColor(valueAccent ? COLOR_PURPLE : COLOR_TEXT);
    doc.text(value, x + width, y, { align: 'right' });
  }

  private drawDivider(doc: jsPDF, x: number, y: number, width: number): void {
    doc.setDrawColor(COLOR_DIVIDER);
    doc.setLineWidth(0.5);
    doc.setLineDashPattern([3, 3], 0);
    doc.line(x, y, x + width, y);
    doc.setLineDashPattern([], 0);
  }

  // ─── Helpers existentes ──────────────────────────────────────

  private mapReport(report: VentaReportResponse): PurchaseHistoryRecord {
    return {
      id: String(report.idVenta),
      fecha: report.fecha,
      hora: report.hora,
      clienteNombre: report.clienteNombre,
      clienteEmail: report.clienteCorreo,
      metodoPago: report.metodoPago,
      tipoComprobante: report.tipoComprobante,
      items: (report.items ?? []).map((item) => ({
        productId: item.productoId,
        nombre: item.nombreProducto,
        precioUnitario: item.precioUnitario,
        cantidad: item.cantidad,
        subtotal: item.subtotal,
      })),
      subtotal: report.subtotal,
      igv: report.igv,
      total: report.total,
      estado: report.estado,
    };
  }

  private upsertReport(report: PurchaseHistoryRecord): void {
    const current = this.historySignal();
    this.historySignal.set([report, ...current.filter((item) => item.id !== report.id)]);
  }

  private formatPdfDate(reporte: PurchaseHistoryRecord): string {
    const fechaHora = reporte.hora ? new Date(`${reporte.fecha}T${reporte.hora}`) : new Date(reporte.fecha);
    return fechaHora.toLocaleString('es-PE');
  }

  private buildFileName(reporte: PurchaseHistoryRecord): string {
    return `compra-${reporte.id}`;
  }
}