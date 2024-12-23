import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email', 
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports: [FormsModule]
})
export class VerifyEmailComponent {
  email: string = '';
  code: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router:Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verify() {
    this.authService.verifyEmail(this.email, this.code).pipe(
      tap(response => {
        console.log('Verification successful', response);        
        Swal.fire('¡Verificación exitosa!', 'Tu correo ha sido verificado correctamente', 'success');
        // Redirigir al login
        this.router.navigate(['/auth/login']);
      }),
      catchError(error => {
        console.error('Verification failed', error);
        // Mostrar un mensaje de error
        Swal.fire('¡Verificación fallida!', 'El código de verificación es incorrecto', 'error');
        return of(null);
      })
    ).subscribe();
  }
}
