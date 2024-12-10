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
  searchUserId: string = '';

  constructor(
    private adminUserService: AdminUserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminUserService.getAllUsers().subscribe(users => {
      this.users = users
        .filter((user: any) => user.activo) // Filtrar usuarios activos
    });
  }

  searchUserById(): void {
    if (this.searchUserId) {
      this.adminUserService.getUserById(this.searchUserId).subscribe(user => {
        if (user.activo) { // Verificar si el usuario está activo
          this.users = [user];
        } else {
          this.users = [];
        }
      });
    } else {
      this.getAllUsers();
    }
  }

  openCreateModal(): void {
    this.selectedUser = { nombres: '', apellidop: '', apellidom: '', email: '', password: '', direccion: '' }; // Inicializa un nuevo usuario
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
    const user = { 
      nombres: this.selectedUser.nombres,
      apellidop: this.selectedUser.apellidop,
      apellidom: this.selectedUser.apellidom,
      email: this.selectedUser.email,
      password: this.selectedUser.password,
      direccion: this.selectedUser.direccion
    };
    this.adminUserService.createUser(user).subscribe(() => {
      this.getAllUsers();
    });
  }

  saveUser(): void {
    const user = { 
      nombres: this.selectedUser.nombres,
      apellidop: this.selectedUser.apellidop,
      apellidom: this.selectedUser.apellidom,
      email: this.selectedUser.email,
      password: this.selectedUser.password,
      direccion: this.selectedUser.direccion
    };
    this.adminUserService.editUser(this.selectedUser.id, user).subscribe(() => {
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