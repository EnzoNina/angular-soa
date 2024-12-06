import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { ProductQuantityModalComponent } from '../product-quantity-modal/product-quantity-modal.component';
import { CartModalComponent } from '../../layout/cart-modal/cart-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [NgFor]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  cart: any = {};

  constructor(private productService: ProductService, private cartService: CartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
    console.log('Productos cargados', this.products);
  }

  loadCart(): void {
    const cartId = +localStorage.getItem('cartId')!;
    this.cartService.getCartWithProducts(cartId).subscribe(cart => {
      this.cart = cart;
      this.cartItems = cart.productos;
    });
  }

  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    const dialogRef = this.dialog.open(ProductQuantityModalComponent, {
      width: '400px', // Ajuste del tamaño del modal
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cartId = +localStorage.getItem('cartId')!;
        console.log('Agregando producto al carrito', cartId, productId, result);        
        this.cartService.addProductToCart(cartId, productId, result).subscribe(() => {
          console.log('Producto agregado al carrito');
        });
      }
    });
  }

  openCartModal(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      width: '600px',
      data: { cartItems: this.cartItems, cart: this.cart }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica después de cerrar el modal
      }
    });
  }
}
