import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  // private baseUrl = `${environment.pagos_url}`;
  private baseUrl = `${environment.gateway}` + 'api/pagos';

  constructor(private http: HttpClient) { }

  iniciarProcesoPago(pago: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, pago);
  }

  validarMetodoPago(metodoPagoId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/validar/${metodoPagoId}`);
  }

  confirmarPago(pagoId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/confirmar/${pagoId}`, {});
  }

  cancelarPago(pagoId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/cancelar/${pagoId}`, {});
  }

  consultarDetallesPago(pagoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${pagoId}`);
  }

  buscarHistorialPagosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  listarPagosPagados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pagados`);
  }

}