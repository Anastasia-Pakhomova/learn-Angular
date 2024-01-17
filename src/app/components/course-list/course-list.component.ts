import { Component, Input } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: CourseInterface[] = []
  public sortingField: keyof CourseInterface = 'dateCreation'

  public onLoad() {
    console.log('Load more')
  }

  public handleEdit(course: CourseInterface) {
   console.log('course for edit', course)
  }

  public handleDelete(id: number) {
    console.log('course id', id)
  } 
}
