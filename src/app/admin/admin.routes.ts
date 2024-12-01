import { Routes } from '@angular/router';
import { RoleGuard } from '../core/guards/role.guard';
import { UserListComponent } from './user-list/user-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'index', component: AdminMenuComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMIN'] } },
    { path: 'users', component: UserListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMIN'] } },
    { path: 'categories', component: CategoryListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMIN'] } },
    { path: 'products', component: ProductListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_ADMIN'] } }
];
