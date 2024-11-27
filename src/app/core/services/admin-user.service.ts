import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private baseUrl = 'http://localhost:9030/api/usuarios';  
  
  constructor(private http: HttpClient) {}

  // Listar todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Usuarios obtenidos:', response))
    );
  }

  // Crear un usuario
  createUser(user: { nombres: string, apellidop: string, apellidom: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user).pipe(
      tap(response => console.log('Usuario creado:', response))
    );
  }

  // Borrar un usuario
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`).pipe(
      tap(response => console.log('Usuario borrado:', response))
    );
  }

  // Editar un usuario
  editUser(userId: string, user: { nombre: string, apellido: string, email: string, telefono: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${userId}`, user).pipe(
      tap(response => console.log('Usuario editado:', response))
    );
  }
}