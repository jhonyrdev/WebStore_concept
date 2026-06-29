import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormComponent } from '@/app/shared/components/ui/form/base-form/base-form.component';
import { MarcaDto, MarcaListDto } from '@/app/features/product/models/marca.model';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseFormComponent],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css',
})
export class MarcaFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input()
  initialData?: MarcaListDto;

  @Output()
  close = new EventEmitter<void>();

  @Output()
  submitForm = new EventEmitter<MarcaDto>();

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  onSubmit(data: any): void {
    this.submitForm.emit({ nombre: data.nombre });
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
