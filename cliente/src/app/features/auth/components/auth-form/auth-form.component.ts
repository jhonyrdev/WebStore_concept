import { Component, effect, inject, input, output } from '@angular/core';
import { ScrollLockService } from '@shared/services/scroll-lock.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
  isOpen = input.required<boolean>();
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

  isRegister = false;

  toggleForm(): void {
    this.isRegister = !this.isRegister;
  }

  onClose(): void {
    this.isRegister = false;
    this.closed.emit();
  }
}
