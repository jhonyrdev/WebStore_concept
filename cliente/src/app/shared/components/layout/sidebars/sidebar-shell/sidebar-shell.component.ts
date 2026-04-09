import { Component, effect, inject, input, output } from '@angular/core';
import { ScrollLockService } from '@shared/services/scroll-lock.service';

@Component({
  selector: 'app-sidebar-shell',
  standalone: true,
  templateUrl: './sidebar-shell.component.html',
  styleUrl: './sidebar-shell.component.css',
})
export class SidebarShellComponent {
  private readonly scrollLockService = inject(ScrollLockService);

  isOpen = input.required<boolean>()
  title  = input<string>('Menú')
  toggle = output<void>()

  private readonly lockScrollEffect = effect((onCleanup) => {
    if (!this.isOpen()) {
      return;
    }

    this.scrollLockService.lock();

    onCleanup(() => {
      this.scrollLockService.unlock();
    });
  });
}
    