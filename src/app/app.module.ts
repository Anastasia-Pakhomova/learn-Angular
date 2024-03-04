import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { CoursesPageModule } from './modules/courses-page/courses-page.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import '@angular/common/locales/global/ru';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FilterPipe} from "./pipes/filter.pipe";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from "../environments/environment.development";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses/effects/courses-effects.effects';
import { AuthEffects } from './store/auth/effects/auth-effects.effects';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    CoursesPageModule,
    LoginPageModule,
    FormsModule,
    FilterPipe,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    EffectsModule.forRoot([CoursesEffects, AuthEffects]),
  ],
  providers: [
    FilterPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
