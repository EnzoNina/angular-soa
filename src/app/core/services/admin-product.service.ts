import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private baseUrl = environment.products_url;
  // private baseUrl = `${environment.gateway}`+'api/producto';

  constructor(private http: HttpClient) { }

  // Listar todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Productos obtenidos:', response))
    );
  }

  // Crear un producto
  createProduct(product: { nombre: string, descripcion: string, precio: number, stock: number, categoriaId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, product).pipe(
      tap(response => console.log('Producto creado:', response))
    );
  }

  // Obtener un producto por su ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productId}`).pipe(
      tap(response => console.log('Producto obtenido:', response))
    );
  }

  // Actualizar un producto existente por su ID
  updateProduct(productId: number, product: { nombre: string, descripcion: string, precio: number, stock: number, categoriaId: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productId}`, product).pipe(
      tap(response => console.log('Producto actualizado:', response))
    );
  }

  // Eliminar un producto por su ID
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`).pipe(
      tap(response => console.log('Producto borrado:', response))
    );
  }

  // Actualizar el stock de un producto por su ID
  updateProductStock(productId: number, stock: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productId}/actualizar-stock`, null, { params: { stock: stock.toString() } }).pipe(
      tap(response => console.log('Stock de producto actualizado:', response))
    );
  }

  // Obtener productos con bajo stock
  getLowStockProducts(limite: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/bajo-stock`, { params: { limite: limite.toString() } }).pipe(
      tap(response => console.log('Productos con bajo stock obtenidos:', response))
    );
  }
}