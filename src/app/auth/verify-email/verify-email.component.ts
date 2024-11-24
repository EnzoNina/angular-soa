import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports: [FormsModule]
})
export class VerifyEmailComponent {
  email: string = '';
  code: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verify() {
    this.authService.verifyEmail(this.email, this.code).pipe(
      tap(response => {
        console.log('Verification successful', response);
        // Redirigir a la página de inicio o mostrar un mensaje de éxito
      }),
      catchError(error => {
        console.error('Verification failed', error);
        return of(null);
      })
    ).subscribe();
  }
}
