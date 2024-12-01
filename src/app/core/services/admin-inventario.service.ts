import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = environment.inventario_url;

  constructor(private http: HttpClient) {}

  agregarExistencias(id: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/producto/${id}/agregar`, null, { params: { cantidad: cantidad.toString() } });
  }

  reducirExistencias(id: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/producto/${id}/reducir`, null, { params: { cantidad: cantidad.toString() } });
  }

  consultarProducto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/producto/${id}`);
  }

  consultarProductosBajoStock(limite: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/bajo-stock`, { params: { limite: limite.toString() } });
  }

  reservarInventario(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservar`, request);
  }

  liberarInventario(reservaId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/liberar`, null, { params: { reservaId: reservaId.toString() } });
  }

  marcarProductoComoAgotado(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/producto/${id}/agotado`, null);
  }

  listarReservas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservas`);
  }
}