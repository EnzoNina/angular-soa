import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { ProductQuantityModalComponent } from '../product-quantity-modal/product-quantity-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [NgFor]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    const dialogRef = this.dialog.open(ProductQuantityModalComponent, {
      width: '250px',
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
}
