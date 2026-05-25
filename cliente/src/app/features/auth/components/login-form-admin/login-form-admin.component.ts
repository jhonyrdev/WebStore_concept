import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminAuthService } from '../../service/admin/admin-auth.service';
import { ErrorMessageComponent } from "@/app/shared/components/ui/error-message/error-message.component";

@Component({
  selector: 'app-login-form-admin',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;
    
    combineLatest([this.authService.login(username, password), timer(1000)])
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: ([authResponse]) => {
          if (authResponse) {
            this.router.navigate(['/tambito++/home']);
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos.';
          }
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error en el servidor. Inténtalo más tarde.';
        }
      });
  }
}
