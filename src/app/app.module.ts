import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { CoursesPageModule } from './modules/courses-page/courses-page.module';
import { FormsModule } from '@angular/forms';
import '@angular/common/locales/global/ru';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule, 
    CoursesPageModule,
    LoginPageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
