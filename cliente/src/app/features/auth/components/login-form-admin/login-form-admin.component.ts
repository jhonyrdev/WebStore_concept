import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminAuthService } from '../../service/admin/admin-auth.service';

@Component({
  selector: 'app-login-form-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form-admin.component.html',
  styleUrl: './login-form-admin.component.css',
})
export class LoginFormAdminComponent {
  private authService = inject(AdminAuthService);
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;
    combineLatest([this.authService.login(email, password), timer(1000)])
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: ([profile]) => {
          if (profile) {
            this.router.navigate(['/tambito++/home']);
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos.';
          }
        },
        error: () => {
          this.errorMessage = 'Error al conectar. Intenta de nuevo.';
        },
      });
  }
}
