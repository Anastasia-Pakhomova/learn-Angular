import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HeaderMenuComponent } from 'src/app/components/header-menu/header-menu.component';
import { SignOutComponent } from 'src/app/components/sign-out/sign-out.component';
import { UserComponent } from 'src/app/components/user/user.component';



@NgModule({
  declarations: [
    HeaderMenuComponent,
    SignOutComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    HeaderMenuComponent
  ]
})
export class HeaderMenuModule { }
