import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CoursesPageComponent } from './courses-page.component';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { CourseListItemComponent } from './components/course-list-item/course-list-item.component';
import { CourseActionsComponent } from './components/course-actions/course-actions.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseBorderDirective } from 'src/app/directives/course-border.directive';
import { FilterPipe } from 'src/app/pipes/filter.pipe';


@NgModule({
  declarations: [
    CoursesPageComponent,
    BreadcrumbsComponent,
    CourseListComponent,
    CourseListItemComponent,
    CourseActionsComponent,
    CourseBorderDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
    CoursesPageComponent
  ],
  providers: [FilterPipe]
})
export class CoursesPageModule { }
