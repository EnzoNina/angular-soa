import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminInventarioService {
  private baseUrl = `${environment.inventario_url}`;
  // private baseUrl = `${environment.gateway}`+'api/reservas';

  constructor(private http: HttpClient) { }

  agregarExistencias(productoId: number, cantidad: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${productoId}/agregar`, null, { params: { cantidad: cantidad.toString() } });
  }

  reducirExistencias(productoId: number, cantidad: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${productoId}/reducir`, null, { params: { cantidad: cantidad.toString() } });
  }

  consultarProducto(productoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productoId}`);
  }

  consultarExistenciasPorId(productoId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${productoId}/existencias`);
  }

  consultarProductosBajoStock(limite: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/bajo-inventario`, { params: { limite: limite.toString() } });
  }

  reservarInventario(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, request);
  }

  liberarInventario(reservaId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${reservaId}/liberar`, null);
  }

  marcarProductoComoAgotado(productoId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${productoId}/agotado`, null);
  }

  listarReservas(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}