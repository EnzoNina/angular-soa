import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';
import { UserUtilsService } from '../../core/services/user-utils.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];
  codigoCupon: string = '';
  showAddressFormFlag: boolean = false;
  usuario: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private pedidoService: PedidoService,
    private userUtilsService: UserUtilsService
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.getCartWithProducts(cartId).subscribe(cart => {
      console.log(cart);
      this.cart = cart;
      this.cartItems = cart.productos;
      this.loadUser(cart.usuarioId);
    });
  }

  loadUser(usuarioId: number): void {
    this.userUtilsService.getUserById(usuarioId.toString()).subscribe(user => {
      this.usuario = user;
    });
  }

  verificarCupon(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.aplicarDescuento(cartId, this.codigoCupon).subscribe(response => {
      this.cart = response;
    });
  }

  vaciarCarrito(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.clearCart(cartId).subscribe(() => {
      this.loadCart();
    });
  }

  placeOrder(): void {
    const cartId = +localStorage.getItem('cartId')!;
    const pedidoRequest = {
      usuarioId: this.cart.usuarioId,
      montoTotal: this.cart.total,
      estado: 'Pendiente',
      direccionEnvio: this.usuario.direccion
    };
    this.pedidoService.createPedido(pedidoRequest).subscribe(response => {
      console.log('Pedido creado con éxito', response);
      this.router.navigate(['user/pago'], { queryParams: { pedidoId: response.id, montoTotal: response.montoTotal } });
    });
  }
}