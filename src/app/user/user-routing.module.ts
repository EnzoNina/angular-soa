import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USER_ROUTES } from './user.routes';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(USER_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
