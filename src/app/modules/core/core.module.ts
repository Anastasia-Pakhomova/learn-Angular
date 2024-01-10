import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMenuModule } from '../header-menu/header-menu.module';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HeaderMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
