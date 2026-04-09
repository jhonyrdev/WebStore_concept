import { Component, effect, HostListener, inject, input, output } from '@angular/core';
import { ScrollLockService } from '@shared/services/scroll-lock.service';

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

  private readonly scrollLockService = inject(ScrollLockService);
  private readonly lockScrollEffect = effect((onCleanup) => {
    if (!this.isOpen()) {
      return;
    }

    this.scrollLockService.lock();

    onCleanup(() => {
      this.scrollLockService.unlock();
    });
  });

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.closeOnScroll() && this.isOpen()) {
      this.closed.emit();
    }
  }
}
