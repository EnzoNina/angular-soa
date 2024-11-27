import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-password-reset',
  templateUrl: './verify-password-reset.component.html',
  styleUrls: ['./verify-password-reset.component.css'],
  imports: [FormsModule]
})
export class VerifyPasswordResetComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyAndResetPassword() {
    this.authService.verifyEmail(this.email, this.code).pipe(
      tap(() => {
        this.authService.resetPassword(this.email, this.code
          , this.newPassword).subscribe(() => {
            Swal.fire('¡Contraseña actualizada!', 'Tu contraseña ha sido actualizada correctamente', 'success');
            this.router.navigate(['/auth/login']);
          });
      }),
      catchError(error => {
        console.error('Verification failed', error);
        Swal.fire('¡Verificación fallida!', 'El código de verificación es incorrecto', 'error');
        return of(null);
      })
    ).subscribe();
  }
}
