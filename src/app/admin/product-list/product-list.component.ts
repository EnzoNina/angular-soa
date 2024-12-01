import { Component, OnInit } from '@angular/core';
import { AdminProductService } from '../../core/services/admin-product.service';
import { InventarioService } from '../../core/services/admin-inventario.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { AdminCategoryService } from '../../core/services/admin-category.service';
import Swal from 'sweetalert2';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ProductStockModalComponent } from '../product-stock-modal/product-stock-modal.component';
import { LowStockModalComponent } from '../low-stock-modal/low-stock-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  imports: [FormsModule, NgFor, MatDialogModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedProduct: any = {};
  newStock: number = 0;

  constructor(
    private adminProductService: AdminProductService,
    private adminCategoriesService: AdminCategoryService,
    private inventarioService: InventarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.checkLowStockProducts();
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

  checkLowStockProducts(): void {
    this.inventarioService.consultarProductosBajoStock(100).subscribe(products => {
      if (products.length > 0) {
        this.dialog.open(LowStockModalComponent, {
          data: { products: products }
        });
      }
    });
  }

  openCreateModal(): void {
    this.selectedProduct = { nombre: '', descripcion: '', precio: 0, categoriaId: '', stock: 0 }; // Inicializa un nuevo producto
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { product: this.selectedProduct, categorias: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProduct();
      }
    });
  }

  openEditModal(product: any): void {
    this.selectedProduct = { ...product };
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { product: this.selectedProduct, categorias: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveProduct();
      }
    });
  }

  openStockModal(product: any): void {
    this.selectedProduct = { ...product };
    const dialogRef = this.dialog.open(ProductStockModalComponent, {
      data: { product: this.selectedProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'add') {
          this.inventarioService.agregarExistencias(this.selectedProduct.id, result.cantidad).subscribe(() => {
            this.getAllProducts();
          });
        } else if (result.action === 'reduce') {
          this.inventarioService.reducirExistencias(this.selectedProduct.id, result.cantidad).subscribe(() => {
            this.getAllProducts();
          });
        }
      }
    });
  }

  createProduct(): void {
    this.adminProductService.createProduct(this.selectedProduct).subscribe(() => {
      this.getAllProducts();
    });
  }

  saveProduct(): void {
    this.adminProductService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
      this.getAllProducts();
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

  markProductAsOutOfStock(productId: number): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, marcar como agotado.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventarioService.marcarProductoComoAgotado(productId).subscribe(() => {
          Swal.fire('Agotado', 'El producto ha sido marcado como agotado.', 'success');
          this.getAllProducts();
        });
      }
    });


  }
}