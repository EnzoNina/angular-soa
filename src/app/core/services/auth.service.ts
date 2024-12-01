import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.auth_url;
  private userUrl = environment.users_url;
  private jwtHelper = new JwtHelperService();
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService, private cartService: CartService) {
  }

  login(email: string, password: string): Observable<{ token: string, usuario: any }> {
    const loginData = { email, password };
    return this.http.post<{ token: string, usuario: any }>(`${this.baseUrl}/login`, loginData).pipe(
      tap(response => {
        // Limpiar todas las cookies antes de establecer las nuevas
        this.cookieService.deleteAll();
        const roles = response.usuario.roles ? [response.usuario.roles] : [];
        this.rolesSubject.next(roles);
        this.cookieService.set('jwt', response.token);
        this.cookieService.set('roles', JSON.stringify(roles));
      }),
      switchMap(() => this.cartService.createCartIfNotExists())
    );
  }

  getRoles(): string[] {
    const rolesCookie = this.cookieService.get('roles');
    if (rolesCookie) {
      try {
        return JSON.parse(rolesCookie);
      } catch (error) {
        console.error('Error al decodificar los roles:', error);
        return [];
      }
    }
    return [];
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('jwt');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  register(nombres: string, apellidop: string, apellidom: string, email: string, password: string): Observable<any> {
    const registerData = { nombres, apellidop, apellidom, email, password };
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }

  sendVerificationEmail(correo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/enviar-codigo`, { correo });
  }

  verifyEmail(correo: string, codigo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verificar-cuenta`, { correo, codigo });
  }

  resetPassword(correo: string, codigo: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { correo, codigo, password });
  }

}