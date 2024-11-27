import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../core/services/admin-user.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [FormsModule,NgFor]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};

  constructor(private adminUserService: AdminUserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminUserService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openEditModal(user: any): void {
    this.selectedUser = { ...user };
    const modal = new bootstrap.Modal('editModal');
    modal.show();
  }
  
  saveUser(): void {
    this.adminUserService.editUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.getAllUsers();
      const modal = new bootstrap.Modal('editModal');
      modal.hide();
    });
  }

  deleteUser(userId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminUserService.deleteUser(userId).subscribe(() => {
          Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          this.getAllUsers();
        });
      }
    });
  }
}
