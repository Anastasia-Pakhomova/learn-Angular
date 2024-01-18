import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginPageComponent } from './components/login-page/login-page.component';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
