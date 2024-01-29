import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from 'src/app/components/search/search.component';
import { CourseActionsComponent } from 'src/app/components/course-actions/course-actions.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseActionsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CourseActionsComponent
  ]
})
export class CourseActionsModule {}
