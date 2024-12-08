import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdminCategoryService {
  private baseUrl = environment.gateway;
  // private baseUrl = `${environment.gateway}`+'api/categoria';

  constructor(private http: HttpClient) {}

  // Listar todas las categorías
  getAllCategorias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/categoria`).pipe(
      tap(response => console.log('Categorías obtenidas:', response))
    );
  }

  // Crear una categoría
  createCategoria(categoria: { nombre: string, descripcion: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, categoria).pipe(
      tap(response => console.log('Categoría creada:', response))
    );
  }

  // Obtener una categoría por su ID
  getCategoriaById(categoriaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${categoriaId}`).pipe(
      tap(response => console.log('Categoría obtenida:', response))
    );
  }

  // Actualizar una categoría existente por su ID
  updateCategoria(categoriaId: number, categoria: { nombre: string, descripcion: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${categoriaId}`, categoria).pipe(
      tap(response => console.log('Categoría actualizada:', response))
    );
  }

  // Eliminar una categoría por su ID
  deleteCategoria(categoriaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${categoriaId}`).pipe(
      tap(response => console.log('Categoría eliminada:', response))
    );
  }
}