import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { NgIf } from '@angular/common';
import { UserHeaderComponent } from './layout/user-header/user-header.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AdminHeaderComponent, UserHeaderComponent, NgIf],
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppComponent {
  title = 'ecommerce-frontend';
  showHeaderFooter: boolean = true;
  isAdminRoute: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = event.url.startsWith('/admin');
        this.showHeaderFooter = !this.isAdminRoute;
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
