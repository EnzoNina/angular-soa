import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9032/auth';
  private jwtHelper = new JwtHelperService();
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const loginData = { email, password };
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, loginData).pipe(
      tap(response => {
        const decodedToken = this.jwtHelper.decodeToken(response.token);
        const roles = decodedToken.roles || [];
        this.rolesSubject.next(roles);
        this.cookieService.set('jwt', response.token);
        this.cookieService.set('roles', JSON.stringify(roles));
      })
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