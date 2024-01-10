import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from 'src/app/pages/courses-page/courses-page.component';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { CourseActionsModule } from '../course-actions/course-actions.module';
import { CourseListModule } from '../course-list/course-list.module';


@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    CourseActionsModule,
    CourseListModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesPageModule { }
