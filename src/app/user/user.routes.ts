import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';


export const USER_ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'products', component: ProductListComponent }
];
