import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css',
})
export class BaseFormComponent {
  @Input({ required: true })
  form!: FormGroup;

  @Input()
  initialData: any;

  @Input()
  title = '';

  @Output()
  submitForm = new EventEmitter<any>();

  @Output()
  close = new EventEmitter<void>();

  get isEditMode(): boolean {
    return !!this.initialData;
  }

  get submitLabel(): string {
    return this.isEditMode ? 'Editar' : 'Guardar';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }

  onClose(): void {
    this.close.emit();
  }
}
