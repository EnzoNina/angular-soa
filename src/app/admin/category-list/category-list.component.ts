import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from '../../core/services/admin-category.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [FormsModule, NgFor, MatDialogModule]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = {};
  searchCategoryId: string = '';

  constructor(
    private adminCategoryService: AdminCategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.adminCategoryService.getAllCategorias().subscribe(categories => {
      this.categories = categories.filter((category: { activo: any; }) => category.activo);
    });
  }

  searchCategoryById(): void {
    if (this.searchCategoryId) {
      this.adminCategoryService.getCategoriaById(Number(this.searchCategoryId)).subscribe(category => {
        if (category.activo) {
          this.categories = [category];
        } else {
          this.categories = [];
        }
      });
    } else {
      this.getAllCategories();
    }
  }

  openCreateModal(): void {
    this.selectedCategory = { nombre: '', descripcion: '' }; // Inicializa una nueva categoría
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: { category: this.selectedCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCategory();
      }
    });
  }

  openEditModal(category: any): void {
    this.selectedCategory = { ...category };
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: { category: this.selectedCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCategory();
      }
    });
  }

  createCategory(): void {
    this.adminCategoryService.createCategoria(this.selectedCategory).subscribe(() => {
      this.getAllCategories();
    });
  }

  saveCategory(): void {
    this.adminCategoryService.updateCategoria(this.selectedCategory.id, this.selectedCategory).subscribe(() => {
      this.getAllCategories();
    });
  }

  deleteCategory(categoryId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminCategoryService.deleteCategoria(categoryId).subscribe(() => {
          Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success');
          this.getAllCategories();
        });
      }
    });
  }
}