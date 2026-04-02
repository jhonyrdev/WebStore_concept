import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css',
})
export class SearchModalComponent {
   isOpen  = input.required<boolean>();
  closed  = output<void>();
  searched = output<string>();

  query = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.query.trim()) return;
    this.searched.emit(this.query.trim());
    this.closed.emit();
  }

  onClose(): void {
    this.query = '';
    this.closed.emit();
  }
}
