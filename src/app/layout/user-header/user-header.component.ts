import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private dialog: MatDialog, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.updateCartItemCount();
  }

  updateCartItemCount(): void {
    const cartId = +localStorage.getItem('cartId')!;
    if (cartId) {
      this.cartService.getCartProducts(cartId).subscribe(products => {
        console.log('Detalle carrito',products)
        this.cartItemCount = products ? products.length : 0;
      });
    } else {
      this.cartItemCount = 0;
    }
  }

  openCartModal(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateCartItemCount();
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
