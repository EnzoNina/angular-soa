import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl = environment.gateway+'/api/producto';
  private baseUrl = `${environment.gateway}` + 'api/producto';

  constructor(private http: HttpClient) { }

  // Listar todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(response => console.log('Productos obtenidos:', response))
    );
  }

  // Obtener detalles de un producto por su ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productId}`).pipe(
      tap(response => console.log('Producto obtenido:', response))
    );
  }


}
