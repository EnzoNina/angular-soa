import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private baseUrl = environment.users_url;

  constructor(private http: HttpClient) { }

  // Listar todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Usuarios obtenidos:', response))
    );
  }

  // Crear un usuario
  createUser(user: { nombres: string, apellidop: string, apellidom: string, email: string, password: string, direccion: string }): Observable<any> {
    const userToCreate = { ...user };
    return this.http.post(`${this.baseUrl}`, userToCreate).pipe(
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
  editUser(userId: string, user: { nombres: string, apellidop: string, apellidom: string, email: string, password: string, direccion: string }): Observable<any> {
    const userToEdit = {
      nombres: user.nombres,
      apellidop: user.apellidop,
      apellidom: user.apellidom,
      email: user.email,
      password: user.password,
      direccion: user.direccion
    };
    console.log(userToEdit);
    return this.http.put(`${this.baseUrl}/${userId}`, userToEdit).pipe(
      tap(response => console.log('Usuario editado:', response))
    );
  }

  // Obtener un usuario por ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`).pipe(
      tap(response => console.log('Usuario obtenido:', response))
    );
  }
}