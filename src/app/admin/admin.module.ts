import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
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
