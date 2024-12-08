import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.auth_url}`;
  // private baseUrl = environment.gateway + '/auth';
  private jwtHelper = new JwtHelperService();
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {
  }

  login(email: string, password: string): Observable<{ token: string, usuario: any }> {
    const loginData = { email, password };
    return this.http.post<{ token: string, usuario: any }>(`${this.baseUrl}/login`, loginData).pipe(
      tap(response => {
        // Limpiar el localStorage antes de establecer los nuevos valores
        localStorage.clear();
        const roles = response.usuario.roles ? [response.usuario.roles] : [];
        const id_usuario = response.usuario.id ? [response.usuario.id] : [];
        this.rolesSubject.next(roles);
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('userId',JSON.stringify(id_usuario));
      }),
      switchMap(() => this.cartService.createCartIfNotExists())
    );
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    if (roles) {
      try {
        return JSON.parse(roles);
      } catch (error) {
        console.error('Error al decodificar los roles:', error);
        return [];
      }
    }
    return [];
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  register(nombres: string, apellidop: string, apellidom: string, email: string, password: string, direccion: string): Observable<any> {
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

  logout(): void {
    localStorage.clear();
  }
}