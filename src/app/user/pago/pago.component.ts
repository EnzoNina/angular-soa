import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagosService } from '../../core/services/pago.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  imports: [FormsModule]
})
export class PagoComponent implements OnInit {
  pedidoId: any;
  montoTotal: any;

  constructor(private pagosService: PagosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pedidoId = +params['pedidoId'];
      this.montoTotal = +params['montoTotal'];
    });
  }

  iniciarPago(pago: any) {
    this.pagosService.iniciarProcesoPago(pago).subscribe(response => {
      console.log('Proceso de pago iniciado:', response);
      this.validarMetodoPago(response.metodoPagoId);
    });
  }

  validarMetodoPago(metodoPagoId: number) {
    this.pagosService.validarMetodoPago(metodoPagoId).subscribe(isValid => {
      if (isValid) {
        this.confirmarPago(metodoPagoId);
      } else {
        this.cancelarPago(metodoPagoId);
      }
    });
  }

  confirmarPago(pagoId: number) {
    this.pagosService.confirmarPago(pagoId).subscribe(response => {
      console.log('Pago confirmado:', response);
    });
  }

  cancelarPago(pagoId: number) {
    this.pagosService.cancelarPago(pagoId).subscribe(() => {
      console.log('Pago cancelado');
    });
  }
}