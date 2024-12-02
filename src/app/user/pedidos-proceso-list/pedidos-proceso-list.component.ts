import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../core/services/pedido.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pedidos-proceso-list',
  templateUrl: './pedidos-proceso-list.component.html',
  styleUrls: ['./pedidos-proceso-list.component.css'],
  imports: [NgIf, NgFor]
})
export class PedidosProcesoListComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadPedidosPendientes();
  }

  loadPedidosPendientes(): void {
    this.pedidoService.getPedidosPendientes().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  confirmarPedido(id: number): void {
    this.pedidoService.updatePedidoEstado(id, 'RECIBIDO').subscribe(() => {
      this.loadPedidosPendientes();
    });
  }
}