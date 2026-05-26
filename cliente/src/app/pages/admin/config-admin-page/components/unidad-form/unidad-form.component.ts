import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseFormComponent } from '@/app/shared/components/ui/form/base-form/base-form.component';
import { Unidad } from '@/app/features/product/models/unidad.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unidad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseFormComponent],
  templateUrl: './unidad-form.component.html',
  styleUrl: './unidad-form.component.css',
})
export class UnidadFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input()
  initialData?: Unidad;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  submitForm = new EventEmitter<Omit<Unidad, 'id'>>();

  form = this.fb.group({
    nombre: ['', Validators.required],
    simbolo: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  onSubmit(data: Unidad): void {
    this.submitForm.emit({ nombre: data.nombre, simbolo: data.simbolo });
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
