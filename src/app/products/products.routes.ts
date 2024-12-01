import { Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const PRODUCTS_ROUTES: Routes = [  
  { path: ':id', component: ProductDetailComponent }, // Ejemplo: /products/123
];
