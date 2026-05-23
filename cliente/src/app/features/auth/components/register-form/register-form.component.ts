import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '@/app/shared/services/alert.service';
import { ErrorMessageComponent } from '@/app/shared/components/ui/error-message/error-message.component';
import { ToastService } from '@/app/shared/services/toast.service';

import { ClientRegisterFacade } from '../../service/client/register/client-register.facade';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private clientregisterFacade = inject(ClientRegisterFacade);
  private alertService = inject(AlertService);
  private toastService = inject(ToastService);

  @Output() closeRegister = new EventEmitter<void>();
  switchToLogin = output<void>();

  regNameMode: 'choice' | 'dni' | 'manual' = 'choice';

  regName = '';
  regDni = '';
  regDniResult = '';
  regEmail = '';
  regPassword = '';
  errorMessage = '';

  showRegPassword = false;

  onDniInput(): void {
    this.regDni = this.regDni.replace(/\D/g, '').slice(0, 8);
  }

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

  lookupNameByDni(): void {
    if (this.regDni.length !== 8) return;

    this.clientregisterFacade.consultarDni(this.regDni).subscribe({
      next: (name) => {
        this.regDniResult = name || 'DNI no encontrado';
      },
      error: () => {
        this.regDniResult = 'Error al consultar DNI';
      },
    });
  }

  useDniMode(): void {
    this.regNameMode = 'dni';
    this.regDni = '';
    this.regDniResult = '';
  }

  useManualMode(): void {
    this.regNameMode = 'manual';
    this.regDni = '';
    this.regDniResult = '';
  }

  backToChoice(): void {
    this.regNameMode = 'choice';
    this.regDni = '';
    this.regDniResult = '';
  }

  onRegister(): void {
    this.errorMessage = '';

    if (this.regNameMode === 'dni') {
      const data = { dni: this.regDni, email: this.regEmail, password: this.regPassword };

      this.clientregisterFacade.registerByDni(data).subscribe({
        next: (ok) => {
          if (ok) {
            this.goToLogin();
          }
        },
        error: () => {
          this.errorMessage = 'Error en el registro DNI';
        },
      });
    } else {
      const [nombre, ...apellidos] = this.regName.split(' ');
      const data = {
        nombre,
        apellido: apellidos.join(' '),
        email: this.regEmail,
        password: this.regPassword,
      };

      this.clientregisterFacade.registerManual(data).subscribe({
        next: (ok) => {
          if (ok) {
            this.goToLogin();
          }
        },
        error: () => {
          this.errorMessage = 'Error en el registro manual';
        },
      });
    }
  }

  onGoogle(): void {
    this.toastService.info('Próximamente con Google');
  }

  onOutlook(): void {
    this.toastService.info('Próximamente con Outlook');
  }

  goToLogin(): void {
    this.switchToLogin.emit();
  }
}
