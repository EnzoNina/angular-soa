import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).pipe(
      tap(response => {
        console.log('Login successful', response);
        const roles = this.authService.getRoles();
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/index']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/user/']);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    ).subscribe();
  }
}
