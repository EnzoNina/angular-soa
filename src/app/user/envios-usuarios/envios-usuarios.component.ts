import { Component, OnInit } from '@angular/core';
import { EnviosService } from '../../core/services/envio.service';
import Swal from 'sweetalert2';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-envios-usuario',
  templateUrl: './envios-usuarios.component.html',
  styleUrls: ['./envios-usuarios.component.css'],
  imports: [NgFor, NgIf]
})
export class EnviosUsuarioComponent implements OnInit {
  envios: any[] = [];
  userId: string | undefined;

  constructor(private envioService: EnviosService) { }

  ngOnInit(): void {
    this.historialEnviosPorUsuario();
  }

  historialEnviosPorUsuario(): void {
    const userId = localStorage.getItem('userId')?.replace(/[\[\]]/g, '');
    this.envioService.historialEnviosPorUsuario(+userId!).subscribe((data: any[]) => {
      this.envios = data;
    });
  }

  consultarEstadoEnvio(envioId: number): void {
    this.envioService.consultarEstadoEnvio(envioId).subscribe((estado: any) => {
      Swal.fire('Estado del Envío', `El estado del envío es: ${estado.estado}`, 'info');
    });
  }

  actualizarEstadoEnvio(envioId: number, nuevoEstado: string): void {
    this.envioService.actualizarEstadoEnvio(envioId, nuevoEstado).subscribe(() => {
      Swal.fire('Actualizado', 'El estado del envío ha sido actualizado', 'success');
      this.historialEnviosPorUsuario();
    });
  }
}