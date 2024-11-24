import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  register(name: string, lastname: string, lastname2: string, email: string, password: string): Observable<any> {
    const registerData = { name, lastname, lastname2, email, password };
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }

  sendVerificationEmail(correo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/enviar-codigo`, { correo });
  }

  verifyEmail(correo: string, codigo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verificar-cuenta`, { correo, codigo });
  }

}
