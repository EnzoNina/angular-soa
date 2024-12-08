import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnviosService {
    private baseUrl = `${environment.gateway}api/envios`;

    constructor(private http: HttpClient) { }

    crearEnvio(request: EnviosRequest): Observable<EnviosResponse> {
        return this.http.post<EnviosResponse>(this.baseUrl, request);
    }

    consultarEstadoEnvio(envioId: number): Observable<EnviosResponse> {
        return this.http.get<EnviosResponse>(`${this.baseUrl}/${envioId}`);
    }

    actualizarEstadoEnvio(envioId: number, nuevoEstado: string): Observable<EnviosResponse> {
        return this.http.put<EnviosResponse>(`${this.baseUrl}/${envioId}`, null, { params: { nuevoEstado } });
    }

    cancelarEnvio(envioId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${envioId}`);
    }

    historialEnviosPorUsuario(usuarioId: number): Observable<EnviosResponse[]> {
        return this.http.get<EnviosResponse[]>(`${this.baseUrl}/usuario/${usuarioId}`);
    }
}

export interface EnviosRequest {
    pedidoId: number;
    usuarioId: number;
    direccionDestino: string;
    transportista: string;
}

export interface EnviosResponse {
    id: number;
    pedidoId: number;
    usuarioId: number;
    direccionDestino: string;
    transportista: string;
    estado: string;
    fechaEnvio: string;
    fechaEntrega: string;
}