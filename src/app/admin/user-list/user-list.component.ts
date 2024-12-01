import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../core/services/admin-user.service';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [FormsModule, NgFor, MatDialogModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};

  constructor(
    private adminUserService: AdminUserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminUserService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  openCreateModal(): void {
    this.selectedUser = { nombres: '', apellidop: '', apellidom: '', email: '', password: '', cuenta_verificada: false, activo: false }; // Inicializa un nuevo usuario
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { user: this.selectedUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUser();
      }
    });
  }

  openEditModal(user: any): void {
    this.selectedUser = { ...user };
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { user: this.selectedUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveUser();
      }
    });
  }

  createUser(): void {
    this.adminUserService.createUser(this.selectedUser).subscribe(() => {
      this.getAllUsers();
    });
  }

  saveUser(): void {
    this.adminUserService.editUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.getAllUsers();
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
