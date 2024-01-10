import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from 'src/app/components/course-list/course-list.component';
import { CourseListItemComponent } from 'src/app/components/course-list-item/course-list-item.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseListItemComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    CourseListComponent
  ]
})
export class CourseListModule { }
