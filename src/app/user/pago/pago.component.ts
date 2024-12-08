import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from '../../core/services/pago.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  imports: [FormsModule]
})
export class PagoComponent implements OnInit {
  pedidoId: any;
  montoTotal: any;
  pagoId: any;

  constructor(private pagosService: PagosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pedidoId = +params['pedidoId'];
      this.montoTotal = +params['montoTotal'];
    });
  }

  iniciarPago(pago: any) {
    this.pagosService.iniciarProcesoPago(pago).subscribe(response => {
      Swal.fire('Proceso de pago iniciado', `ID: ${response.id}`, 'success');
      this.pagoId = response.id; // Almacenar el id del pago
      this.validarMetodoPago(response.metodoPagoId);
    });
  }

  validarMetodoPago(metodoPagoId: number) {
    this.pagosService.validarMetodoPago(metodoPagoId).subscribe(isValid => {
      if (isValid) {
        this.confirmarPago(this.pagoId); // Usar el id del pago
      } else {
        this.cancelarPago(this.pagoId); // Usar el id del pago
      }
    });
  }

  confirmarPago(pagoId: number) {
    this.pagosService.confirmarPago(pagoId).subscribe(response => {
      Swal.fire('Pago confirmado', `ID: ${pagoId}`, 'success');
      this.router.navigate(['/user/index']); // Redirigir al índice
    });
  }

  cancelarPago(pagoId: number) {
    this.pagosService.cancelarPago(pagoId).subscribe(() => {
      Swal.fire('Pago cancelado', `ID: ${pagoId}`, 'error');
    });
  }
}