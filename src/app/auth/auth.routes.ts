import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyEmailPasswordComponent } from './verify-email-password/verify-email-password.component';
import { VerifyPasswordResetComponent } from './verify-password-reset/verify-password-reset.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'verify-email-password', component: VerifyEmailPasswordComponent },
  { path: 'recovery-password', component: RequestPasswordResetComponent },
  { path: 'request-password-reset', component: VerifyPasswordResetComponent }

];
