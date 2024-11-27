import { Component, OnInit } from '@angular/core';
import { AdminCategoryService } from '../../core/services/admin-category.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [FormsModule, NgFor]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = {};

  constructor(private adminCategoryService: AdminCategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.adminCategoryService.getAllCategorias().subscribe(categories => {
      this.categories = categories;
    });
  }

  openEditModal(category: any): void {
    this.selectedCategory = { ...category };
    const modal = new bootstrap.Modal('editModal');
    modal.show();
  }

  saveCategory(): void {
    this.adminCategoryService.updateCategoria(this.selectedCategory.id, this.selectedCategory).subscribe(() => {
      this.getAllCategories();
      const modal = new bootstrap.Modal('editModal');
      modal.hide();
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
