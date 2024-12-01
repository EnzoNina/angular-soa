import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];

  constructor(@Inject(CartService) private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartId = 1; // Reemplaza con el ID del carrito del usuario
    this.cartService.getCart(cartId).subscribe(response => {
      this.cart = response.carrito;
      this.cartItems = response.detalle_carrito;
    });
  }

  removeItem(productId: number): void {
    const cartId = 1; // Reemplaza con el ID del carrito del usuario
    this.cartService.removeProductFromCart(cartId, productId).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart(): void {
    const cartId = 1; // Reemplaza con el ID del carrito del usuario
    this.cartService.clearCart(cartId).subscribe(() => {
      this.loadCart();
    });
  }
}
