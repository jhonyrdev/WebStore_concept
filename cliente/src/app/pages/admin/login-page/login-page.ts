import { Component } from '@angular/core';
import { LoginFormAdminComponent } from '../../../features/auth/components/login-form-admin/login-form-admin.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormAdminComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {}
