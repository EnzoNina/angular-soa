import { Component, OnInit } from '@angular/core';
import { EnviosRequest, EnviosResponse, EnviosService } from '../../core/services/envio.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PagosService } from '../../core/services/pago.service';
import { PedidoService } from '../../core/services/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import { EnvioModalComponent } from '../envio-modal/envio-modal.component';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EnviosComponent implements OnInit {
  enviosForm: FormGroup;
  envios: EnviosResponse[] = [];
  pagosPagados: any[] = []; // Nueva propiedad para almacenar los pagos pagados

  constructor(
    private enviosService: EnviosService,
    private fb: FormBuilder,
    private pagosService: PagosService,
    private pedidoService: PedidoService, // Inyectar PedidoService
    public dialog: MatDialog
  ) {
    this.enviosForm = this.fb.group({
      pedidoId: ['', Validators.required],
      usuarioId: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      transportista: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pagosService.listarPagosPagados().subscribe(pagosPagados => {
      this.pagosPagados = pagosPagados; // Guardar los pagos pagados
      pagosPagados.forEach(pago => {
        this.pedidoService.getPedidoById(pago.pedidoId).subscribe(pedido => {
          pago.usuarioId = pedido.usuarioId;
          pago.direccionEnvio = pedido.direccionEnvio;
        });
      });
    });
  }

  openEnvioModal(pago: any): void {
    const dialogRef = this.dialog.open(EnvioModalComponent, {
      width: '600px',
      data: {
        pedidoId: pago.pedidoId,
        usuarioId: pago.usuarioId,
        direccionDestino: pago.direccionEnvio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crearEnvio(result);
      }
    });
  }

  crearEnvio(data: any): void {
    const request: EnviosRequest = data;
    this.enviosService.crearEnvio(request).subscribe(response => {
      Swal.fire('Éxito', 'El envío ha sido creado con éxito', 'success');
      this.envios.push(response);
    });
  }

  cancelarEnvio(envioId: number): void {
    this.enviosService.cancelarEnvio(envioId).subscribe(() => {
      Swal.fire('Cancelado', 'El envío ha sido cancelado', 'success');
      this.envios = this.envios.filter(envio => envio.id !== envioId);
    });
  }
}