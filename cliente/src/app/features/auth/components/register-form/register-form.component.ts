import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  switchToLogin = output<void>();

  regName = '';
  regEmail = '';
  regPassword = '';
  showRegPassword = false;

  get regPasswordStrength(): number {
    const password = this.regPassword;
    let score = 0;

    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    return Math.min(score, 100);
  }

  get regPasswordStrengthLabel(): string {
    const strength = this.regPasswordStrength;

    if (!this.regPassword) return 'Escribe una contraseña';
    if (strength < 40) return 'Débil';
    if (strength < 75) return 'Media';
    return 'Fuerte';
  }

  get regPasswordStrengthTrackClass(): string {
    const strength = this.regPasswordStrength;

    if (!this.regPassword) return 'bg-slate-200';
    if (strength < 40) return 'bg-red-500';
    if (strength < 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  }

  onRegister(): void {
    // lógica de registro aquí
  }

  onGoogle(): void {
    // OAuth Google
  }

  onOutlook(): void {
    // OAuth Outlook
  }

  goToLogin(): void {
    this.switchToLogin.emit();
  }
}
