import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-password-reset',
  templateUrl: './verify-password-reset.component.html',
  styleUrls: ['./verify-password-reset.component.css'],
  imports: [FormsModule]
})
export class VerifyPasswordResetComponent {
  email: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyAndResetPassword() {
    console.log('Email:', this.email);
    this.authService.resetPassword(this.email, this.newPassword).subscribe(() => {
      Swal.fire('¡Contraseña actualizada!', 'Tu contraseña ha sido actualizada correctamente', 'success');
      this.router.navigate(['/auth/login']);
    });
  }
}
