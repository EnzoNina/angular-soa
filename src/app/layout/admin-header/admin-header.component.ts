import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private cookieService: CookieService, private router: Router) {}

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
