import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class CartModalComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];

  constructor(public dialogRef: MatDialogRef<CartModalComponent>, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.getCartWithProducts(cartId).subscribe(cart => {
      console.log('Cart:', cart);
      this.cart = cart;
      this.cartItems = cart.productos;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToCheckout(): void {
    console.log('Go to checkout');
    this.dialogRef.close();
    this.router.navigate(['user/checkout']);
  }

  updateQuantity(cartDetailId: number, quantity: number): void {
    this.cartService.updateProductQuantity(cartDetailId, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  removeFromCart(productoId: number): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.removeProductFromCart(cartId, productoId).subscribe(() => {
      this.loadCart();
    });
  }

  deleteCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.deleteCart(cartId).subscribe(() => {
      console.log('Carrito eliminado');
      localStorage.removeItem('cartId');
      this.dialogRef.close();
    });
  }

  saveCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.saveCart(cartId).subscribe(() => {
      console.log('Carrito guardado');
      this.dialogRef.close();
    });
  }

}