import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).pipe(
      tap(response => {
        console.log('Login successful', response);
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    ).subscribe();
  }
}