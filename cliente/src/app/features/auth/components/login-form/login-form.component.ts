import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  switchToRegister = output<void>();

  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;

  onSignIn(): void {
    // lógica de login aquí
  }

  onGoogle(): void {
    // OAuth Google
  }

  onOutlook(): void {
    // OAuth Outlook
  }

  goToRegister(): void {
    this.switchToRegister.emit();
  }
}
