import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../core/services/pedido.service';

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

  constructor(private cartService: CartService, private router: Router, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.getCartWithProducts(cartId).subscribe(cart => {
      this.cart = cart;
      this.cartItems = cart.productos;
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
    this.pedidoService.createPedidoFromCarrito(cartId).subscribe(response => {
      console.log('Pedido creado con éxito', response);
      this.router.navigate(['/order-confirmation']);
    });
  }
}