import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTES } from './products.routes';

@NgModule({
  imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
