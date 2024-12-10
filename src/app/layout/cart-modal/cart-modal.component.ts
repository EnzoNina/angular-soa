import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../utils/loading/loading.component';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class CartModalComponent implements OnInit {
  cart: any;
  cartItems: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (data) {
      this.cartItems = data.cartItems || [];
      this.cart = data.cart || {};
    }
  }

  ngOnInit(): void {
    if (!this.cartItems.length) {
      this.loadCart();
    }
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
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    this.cartService.updateProductQuantity(cartDetailId, quantity).subscribe(() => {
      this.loadCart();
      loadingDialogRef.close();
    });
  }

  removeFromCart(productoId: number): void {
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.removeProductFromCart(cartId, productoId).subscribe(() => {
      this.loadCart();
      loadingDialogRef.close();
    });
  }

  deleteCart(): void {
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.deleteCart(cartId).subscribe(() => {
      console.log('Carrito eliminado');
      localStorage.removeItem('cartId');
      this.dialogRef.close();
      loadingDialogRef.close();
    });
  }

  saveCart(): void {
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.saveCart(cartId).subscribe(() => {
      console.log('Carrito guardado');
      this.createNewCart(loadingDialogRef);
    });
  }

  createNewCart(loadingDialogRef: any): void {
    const usuarioId = this.cart.usuarioId;
    this.cartService.createNewCart(usuarioId).subscribe(newCart => {
      console.log('Nuevo carrito creado:', newCart);
      localStorage.setItem('cartId', newCart.id.toString());
      loadingDialogRef.close();
      this.dialogRef.close();
    });
  }

  moveCartToWishlist(): void {
    const loadingDialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true
    });

    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.moveCartToWishlist(cartId).subscribe(() => {
      console.log('Carrito movido a la lista de deseos');
      this.createNewCart(loadingDialogRef);
    });
  }
}