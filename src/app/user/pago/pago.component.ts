import { Component } from '@angular/core';
import { PagosService } from '../../core/services/pago.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  imports: [FormsModule]
})
export class PagoComponent {
  constructor(private pagosService: PagosService) { }

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