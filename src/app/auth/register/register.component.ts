import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]
})
export class RegisterComponent {
  name: string = ''; // Nombres
  apellidop: string = ''; // ApeP
  apellidom: string = ''; // ApeM
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  register() {
    this.authService.register(this.name, this.apellidop, this.apellidom, this.email, this.password).pipe(
      tap(response => {
        console.log('Data', this.email);
        console.log('Registration successful', response);
        this.authService.sendVerificationEmail(this.email).subscribe();
        this.router.navigate(['/auth/verify-email'], { queryParams: { email: this.email } });
      }),
      catchError(error => {
        console.error('Registration failed', error);
        return of(null);
      })
    ).subscribe();
  }
}
