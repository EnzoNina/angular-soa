import { Component, OnInit } from '@angular/core';
import { AdminProductService } from '../../core/services/admin-product.service';
import { AdminInventarioService } from '../../core/services/admin-inventario.service';
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
  styleUrls: ['./product-list.component.css'],
  imports: [FormsModule, NgFor, MatDialogModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  destacados: any[] = [];
  categories: any[] = [];
  selectedProduct: any = {};
  newStock: number = 0;
  searchProductId: number | null = null; // Nueva propiedad para almacenar el ID del producto a buscar

  constructor(
    private adminProductService: AdminProductService,
    private adminCategoriesService: AdminCategoryService,
    private adminInventarioService: AdminInventarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getDestacados();
    this.checkLowStockProducts();
  }

  getAllCategories(): void {
    this.adminCategoriesService.getAllCategorias().subscribe(categories => {
      this.categories = categories;
    });
  }

  getAllProducts(): void {
    this.adminProductService.getAllProductsNoAgotado().subscribe(products => {
      this.products = products;
    });
  }

  getDestacados(): void {
    this.adminProductService.getDestacados().subscribe(destacados => {
      this.destacados = destacados;
    });
  }

  checkLowStockProducts(): void {
    this.adminInventarioService.consultarProductosBajoStock(100).subscribe(products => {
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
          this.adminInventarioService.agregarExistencias(this.selectedProduct.id, result.cantidad).subscribe(() => {
            this.getAllProducts();
          });
        } else if (result.action === 'reduce') {
          this.adminInventarioService.reducirExistencias(this.selectedProduct.id, result.cantidad).subscribe(() => {
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
        this.adminInventarioService.marcarProductoComoAgotado(productId).subscribe(() => {
          Swal.fire('Agotado', 'El producto ha sido marcado como agotado.', 'success');
          this.getAllProducts();
        });
      }
    });
  }

  consultarExistencias(productId: number): void {
    this.adminInventarioService.consultarExistenciasPorId(productId).subscribe(response => {
      Swal.fire({
        title: 'Existencias del Producto',
        text: `El producto tiene ${response} existencias.`,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  listarReservas(): void {
    this.adminInventarioService.listarReservas().subscribe(reservas => {
      let reservasHtml = '<ul>';
      reservas.forEach((reserva: any) => {
        reservasHtml += `<li>ID: ${reserva.id}, Producto ID: ${reserva.productoId}, Cantidad: ${reserva.cantidad}, Pedido ID: ${reserva.pedidoId}, Fecha Reserva: ${reserva.fechaReserva}, Estado: ${reserva.estado}</li>`;
      });
      reservasHtml += '</ul>';

      Swal.fire({
        title: 'Lista de Reservas',
        html: reservasHtml,
        icon: 'info',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  marcarComoDestacado(productId: number): void {
    this.adminProductService.marcarComoDestacado(productId).subscribe(() => {
      Swal.fire('Destacado', 'El producto ha sido marcado como destacado.', 'success');
      this.getAllProducts();
      this.getDestacados();
    });
  }

  desmarcarComoDestacado(productId: number): void {
    this.adminProductService.desmarcarComoDestacado(productId).subscribe(() => {
      Swal.fire('Desmarcado', 'El producto ha sido desmarcado como destacado.', 'success');
      this.getDestacados();
    });
  }

  buscarProductoPorId(): void {
    if (this.searchProductId !== null) {
      this.adminProductService.getProductById(this.searchProductId).subscribe(product => {
        Swal.fire({
          title: 'Producto Encontrado',
          text: `ID: ${product.id}, Nombre: ${product.nombre}, Descripción: ${product.descripcion}, Precio: ${product.precio}, Stock: ${product.stock}, Categoría: ${product.categoriaNombre}`,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      });
    }
  }
}