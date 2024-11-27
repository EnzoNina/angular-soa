import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    const roles = this.authService.getRoles();
    console.log('Roles:', roles);

    if (!roles.some(role => expectedRoles.includes(role))) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
