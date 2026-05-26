import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '@shared-Component-Ui/data-table/data-table.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

  usuario = signal({
    nombre: 'Franco Javier',
    apellido: 'Ugarte Quinto',
    correo: 'franco.javier@tambito.com',
    rol: 'CLIENTE',
    miembroDesde: '2026-03-15',
    puntosActuales: 120,
    puntosSiguienteNivel: 200
  });

  // NUEVO: Lista de cupones mockeados para el cliente
  cupones = signal([
    { codigo: 'TAMBO10', descripcion: '10% de dscto en licores', expira: '31 May', usado: false },
    { codigo: 'PROMOCHAUFA', descripcion: 'Envío gratis en combos', expira: '05 Jun', usado: false }
  ]);

  estadisticas = signal([
    { label: 'Pedidos Totales', valor: '4', icono: '📦' },
    { label: 'Puntos Tambito+', valor: '120', icono: '⭐' },
    { label: 'Cupones', valor: '2 Activos', icono: '🎟️' }
  ]);

  historialPedidos = signal([
    { id: 'PED-0041', fecha: '2026-05-10', total: 45.90, estado: 'Realizado' },
    { id: 'PED-0028', fecha: '2026-04-22', total: 12.50, estado: 'Realizado' },
    { id: 'PED-0012', fecha: '2026-04-05', total: 85.00, estado: 'Pendiente' },
    { id: 'PED-0005', fecha: '2026-03-20', total: 110.00, estado: 'Cancelado' }
  ]);

  columnasHistorial: TableColumn[] = [
    { key: 'id', label: 'Código', align: 'left' },
    { key: 'fecha', label: 'Fecha', align: 'center' },
    { key: 'total', label: 'Total', align: 'right' },
    { key: 'estado', label: 'Estado', align: 'center' },
    { key: 'acciones', label: 'Acción', align: 'center' } // NUEVA COLUMNA
  ];
  
  tabActivo = signal<'historial' | 'favoritos' | 'cupones'>('historial'); // NUEVA PESTAÑA

  favoritos = signal([
    { id: 101, nombre: 'Six Pack Pilsen Callao 355ml', precio: 24.90, categoria: 'Cervezas' },
    { id: 102, nombre: 'Helado D\'Onofrio Frio Rico', precio: 5.50, categoria: 'Helados' },
    { id: 103, nombre: 'Combo Shawarma Clásico', precio: 15.90, categoria: 'Comidas' }
  ]);

  cambiarTab(nuevoTab: 'historial' | 'favoritos' | 'cupones') {
    this.tabActivo.set(nuevoTab);
  }

  eliminarFavorito(id: number) {
    this.favoritos.update(favs => favs.filter(f => f.id !== id));
  }

  // NUEVO: Efecto visual de copiado de cupón
  copiarCupon(codigo: string) {
    navigator.clipboard.writeText(codigo);
    alert(`¡Código ${codigo} copiado al portapapeles!`);
  }

  ngOnInit(): void {}
}