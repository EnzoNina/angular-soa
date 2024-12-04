import { Component, OnInit } from '@angular/core';
import { PagosService } from '../../core/services/pago.service';

@Component({
  selector: 'app-admin-pagos',
  templateUrl: './admin-pagos.component.html',
  styleUrls: ['./admin-pagos.component.css']
})
export class AdminPagosComponent implements OnInit {
  historialPagos: any[] = [];
  detallesPago: any;

  constructor(private pagosService: PagosService) { }

  ngOnInit(): void {
    this.buscarHistorialPagosPorUsuario(1); // Reemplaza con el ID del usuario deseado
  }

  buscarHistorialPagosPorUsuario(usuarioId: number) {
    this.pagosService.buscarHistorialPagosPorUsuario(usuarioId).subscribe(response => {
      this.historialPagos = response;
    });
  }

  consultarDetallesPago(pagoId: number) {
    this.pagosService.consultarDetallesPago(pagoId).subscribe(response => {
      this.detallesPago = response;
    });
  }
}