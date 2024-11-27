import { Component, OnInit } from '@angular/core';
import { AdminProductService } from '../../core/services/admin-product.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { AdminCategoryService } from '../../core/services/admin-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [FormsModule, NgFor]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedProduct: any = {};
  newStock: number = 0;

  constructor(private adminProductService: AdminProductService, private adminCategoriesService: AdminCategoryService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.adminCategoriesService.getAllCategorias().subscribe(categories => {
      this.categories = categories;
    });
  }

  getAllProducts(): void {
    this.adminProductService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  openEditModal(product: any): void {
    this.selectedProduct = { ...product };
    const modal = new bootstrap.Modal('editModal');
    modal.show();
  }

  openStockModal(product: any): void {
    this.selectedProduct = { ...product };
    this.newStock = this.selectedProduct.stock;
    const modal = new bootstrap.Modal('stockModal');
    modal.show();
  }

  updateStock(): void {
    this.adminProductService.updateProductStock(this.selectedProduct.id, this.newStock).subscribe(() => {
      this.getAllProducts();
      const modal = new bootstrap.Modal('stockModal');
      modal.hide();
    });
  }

  saveProduct(): void {
    this.adminProductService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
      this.getAllProducts();
      const modal = new bootstrap.Modal('editModal');
      modal.hide();
    });
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminProductService.deleteProduct(productId).subscribe(() => {
          Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
          this.getAllProducts();
        });
      }
    });
  }

}
