import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email-password',
  templateUrl: './verify-email-password.component.html',
  styleUrls: ['./verify-email-password.component.css'],
  imports: [FormsModule]
})
export class VerifyEmailPasswordComponent {
  email: string = '';
  code: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verify() {
    this.authService.verifyEmail(this.email, this.code).pipe(
      tap(response => {
        console.log('Verification successful', response);
        // Redirigir al login        
      }),
      catchError(error => {
        console.error('Verification failed', error);
        // Mostrar un mensaje de error
        Swal.fire('¡Verificación fallida!', 'El código de verificación es incorrecto', 'error');
        return of(null);
      })
    ).subscribe();
    this.router.navigate(['/auth/request-password-reset']), { queryParams: { email: this.email } };
  }
}
