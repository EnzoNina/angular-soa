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
    this.router.navigate(['/checkout']);
  }

  updateQuantity(cartDetailId: number, quantity: number): void {
    this.cartService.updateProductQuantity(cartDetailId, quantity).subscribe(() => {
      this.loadCart();
    });
  }
  
  removeFromCart(cartDetailId: number): void {
    this.cartService.removeProductFromCart(cartDetailId).subscribe(() => {
      this.loadCart();
    });
  }

}