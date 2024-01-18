import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: CourseInterface[] = []
  public sortingField: keyof CourseInterface = 'dateCreation'
  @Output() editCourse = new EventEmitter<CourseInterface>()
  @Output() deleteCourse = new EventEmitter<number>()

  public onLoad() {
    console.log('Load more')
  }

  public handleEdit(course: CourseInterface) {
   this.editCourse.emit(course)
  }

  public handleDelete(id: number) {
    this.deleteCourse.emit(id)
  }
}
