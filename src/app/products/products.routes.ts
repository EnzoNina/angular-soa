import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: HomePageComponent },
  { path: ':id', component: ProductDetailComponent }, // Ejemplo: /products/123
];
