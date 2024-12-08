import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private baseUrl = environment.gateway + '/api/pedidos';
    // private baseUrl = `${environment.gateway}`+'api/pedidos';

    constructor(private http: HttpClient) { }

    getAllPedidos(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    getPedidoById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createPedido(request: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, request);
    }

    updatePedido(id: number, request: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, request);
    }

    deletePedido(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    createPedidoFromCarrito(carritoId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/from-carrito/${carritoId}`, {});
    }

    cancelPedido(pedidoId: number): Observable<any> {
        return this.http.put(`${this.baseUrl}/cancel/${pedidoId}`, {});
    }

    getPedidosByUsuarioId(usuarioId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/usuario/${usuarioId}`);
    }

    getPedidoEstado(id: number): Observable<string> {
        return this.http.get(`${this.baseUrl}/${id}/estado`, { responseType: 'text' });
    }

    updatePedidoEstado(id: number, estado: string): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}/estado?estado=${estado}`, {});
    }

    getPedidosPendientes(): Observable<any> {
        return this.http.get(`${this.baseUrl}/estado/pendiente`);
    }

    repeatLastPedido(usuarioId: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/repeat-last/${usuarioId}`, {});
    }
}