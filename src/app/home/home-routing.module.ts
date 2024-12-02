import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTES } from './home.routes';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
