import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../core/services/pedido.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { LoadingComponent } from '../../utils/loading/loading.component';

@Component({
  selector: 'app-pedidos-proceso-list',
  templateUrl: './pedidos-proceso-list.component.html',
  styleUrls: ['./pedidos-proceso-list.component.css'],
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatTableModule, LoadingComponent]
})
export class PedidosProcesoListComponent implements OnInit {
  pedidos: any[] = [];
  loading: boolean = false;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadPedidosPendientes();
  }

  loadPedidosPendientes(): void {
    this.loading = true;
    this.pedidoService.getPedidosPendientes().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.loading = false;
    });
  }

  confirmarPedido(id: number): void {
    this.loading = true;
    this.pedidoService.updatePedidoEstado(id, 'RECIBIDO').subscribe(() => {
      this.loadPedidosPendientes();
      this.loading = false;
    });
  }

  cancelarPedido(id: number): void {
    this.loading = true;
    this.pedidoService.cancelPedido(id).subscribe(() => {
      this.loadPedidosPendientes();
      this.loading = false;
    });
  }
}