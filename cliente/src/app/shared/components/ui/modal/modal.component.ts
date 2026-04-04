import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
   isOpen     = input.required<boolean>();
  maxWidth   = input<string>('max-w-lg');
  paddingTop = input<string>('pt-20');
  
  // Comportamientos opcionales
  closeOnScroll    = input<boolean>(false);
  closeOnBackdrop  = input<boolean>(false);

  closed = output<void>();

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.closeOnScroll() && this.isOpen()) {
      this.closed.emit();
    }
  }
}
