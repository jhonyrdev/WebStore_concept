import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseFormComponent } from '@/app/shared/components/ui/form/base-form/base-form.component';
import { MetodoPago, TipoMetodoPago } from '@/app/features/sales/models/metodo-pago.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metodo-pago-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseFormComponent],
  templateUrl: './metodo-pago-form.component.html',
  styleUrl: './metodo-pago-form.component.css',
})
export class MetodoPagoFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input()
  initialData?: MetodoPago;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  submitForm = new EventEmitter<Omit<MetodoPago, 'id'>>();

  tipos = [
    { value: TipoMetodoPago.BILLETERAS_DIGITALES, label: 'Billeteras Digitales' },
    { value: TipoMetodoPago.TARJETAS, label: 'Tarjetas' },
  ];

  form = this.fb.group({
    nombre: ['', Validators.required],
    tipo: [TipoMetodoPago.TARJETAS, Validators.required],
    estado: [true],
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue({
        nombre: this.initialData.nombre,
        tipo: this.initialData.tipo,
        estado: this.initialData.estado,
      });
    }
  }

  onSubmit(data: any): void {
    this.submitForm.emit({
      nombre: data.nombre,
      tipo: data.tipo,
      estado: data.estado,
    });
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
