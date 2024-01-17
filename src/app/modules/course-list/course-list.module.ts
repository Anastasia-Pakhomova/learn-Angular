import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from 'src/app/components/course-list/course-list.component';
import { CourseListItemComponent } from 'src/app/components/course-list-item/course-list-item.component';
import { ButtonModule } from 'primeng/button';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { CourseBorderDirective } from 'src/app/directives/course-border.directive';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    DurationPipe,
    CourseBorderDirective,
    OrderByPipe
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
