import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RoleGuard } from '../core/guards/role.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { PedidosProcesoListComponent } from './pedidos-proceso-list/pedidos-proceso-list.component';
import { PagoComponent } from './pago/pago.component';
import { EnviosUsuarioComponent } from './envios-usuarios/envios-usuarios.component';


export const USER_ROUTES: Routes = [
    {
        path: '', component: HomePageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] }

    },
    {
        path: 'products', component: ProductListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    }
    ,{
        path: 'checkout', component: CheckoutComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    },
    {
        path: 'pedidos', component: PedidosListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    },
    {
        path: 'pedidos-proceso', component: PedidosProcesoListComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    },
    {
        path: 'pago', component: PagoComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    },
    {
        path: 'envios', component: EnviosUsuarioComponent, canActivate: [RoleGuard], data: { expectedRoles: ['ROLE_USER'] },
    }

];
