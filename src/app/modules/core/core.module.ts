import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    HeaderMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
