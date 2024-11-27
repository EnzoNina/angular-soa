import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    providers: [provideHttpClient()]
})
export class AdminModule { }
