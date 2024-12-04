import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../core/services/pedido.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
  imports: [NgIf, NgFor]
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
    });
  }

  deletePedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe(() => {
      this.loadPedidos();
    });
  }

  verEstadoPedido(id: number): void {
    this.pedidoService.getPedidoEstado(id).subscribe(estado => {
      this.pedidoEstado = estado;
    });
  }

  repeatLastPedido(usuarioId: number): void {
    this.pedidoService.repeatLastPedido(usuarioId).subscribe(() => {
      Swal.fire('Éxito', 'El pedido fue repetido con éxito', 'success');
      this.loadPedidos();
    });
  }
}