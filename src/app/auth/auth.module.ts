import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent
  ],
  providers: [provideHttpClient()]
})
export class AuthModule { }
