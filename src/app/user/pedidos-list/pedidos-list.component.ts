import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../core/services/pedido.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatDialogModule]
})
export class PedidosListComponent implements OnInit {
  pedidos: any[] = [];
  selectedPedido: any = null;
  pedidoEstado: string | null = null;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getAllPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  viewPedido(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe(pedido => {
      this.selectedPedido = pedido;
      Swal.fire({
        title: 'Detalles del Pedido',
        html: `
          <p><strong>ID:</strong> ${pedido.id}</p>
          <p><strong>Usuario ID:</strong> ${pedido.usuarioId}</p>
          <p><strong>Fecha:</strong> ${pedido.fechaPedido}</p>
          <p><strong>Monto Total:</strong> S/. ${pedido.montoTotal}</p>
          <p><strong>Estado:</strong> ${pedido.estado}</p>
          <p><strong>Dirección de Envío:</strong> ${pedido.direccionEnvio}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  deletePedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe(() => {
      this.loadPedidos();
      Swal.fire('Eliminado', 'El pedido ha sido eliminado.', 'success');
    });
  }

  verEstadoPedido(id: number): void {
    this.pedidoService.getPedidoEstado(id).subscribe(estado => {
      this.pedidoEstado = estado;
      Swal.fire({
        title: 'Estado del Pedido',
        text: estado,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  repeatLastPedido(usuarioId: number): void {
    this.pedidoService.repeatLastPedido(usuarioId).subscribe(() => {
      Swal.fire('Éxito', 'El pedido fue repetido con éxito', 'success');
      this.loadPedidos();
    });
  }
}