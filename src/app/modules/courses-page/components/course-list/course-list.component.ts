import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnChanges{
  @Input() courses: CourseInterface[] = []
  public sortingField: keyof CourseInterface = 'dateCreation'
  @Output() editCourse = new EventEmitter<CourseInterface>()
  @Output() deleteCourse = new EventEmitter<number>()
  @Output() loadList = new EventEmitter<number>()
  public courseList: CourseInterface[] = []

  public onLoad() {
    this.loadList.emit(this.courseList.length + 5)
  }

  public handleEdit(course: CourseInterface) {
   this.editCourse.emit(course)
  }

  public handleDelete(id: number) {
    this.deleteCourse.emit(id)
  }

  ngOnChanges(): void {
  this.courseList = this.courses.map((item: CourseInterface) => {
      return {...item, dateCreation: new Date(item.dateCreation)}
    })
  }

}
