import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css'],
  imports: [FormsModule]
})
export class RequestPasswordResetComponent {
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  requestPasswordReset() {
    this.authService.sendVerificationEmail(this.email).pipe(
      tap(() => {
        
      }),
      catchError(error => {
        console.error('Error sending verification email', error);
        return of(null);
      })
    ).subscribe();
    this.router.navigate(['/auth/verify-email-password'], { queryParams: { email: this.email } });
  }
}
