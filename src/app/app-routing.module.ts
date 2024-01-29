import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './modules/courses-page/courses-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CourseEditComponent } from './modules/courses-page/components/course-edit/course-edit.component';
import { authGuard } from './guards/auth.guard';
import { LoginPageComponent } from './modules/login-page/components/login-page/login-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginPageComponent},
  {path: 'courses', component: CoursesPageComponent, canActivate: [authGuard]},
  {path: 'courses/:id', component: CourseEditComponent, canActivate: [authGuard]},
  {path: 'courses/new', component: CourseEditComponent, canActivate: [authGuard]},
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
