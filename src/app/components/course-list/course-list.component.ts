import { Component, OnInit } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';
import { coursesData } from './data';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public courses: CourseInterface[] = []

  public onLoad() {
    console.log('Load more')
  }

  public handleEdit(id: number) {
   let courseforEdit = this.courses.find(item => item.id === id)
   console.log('course for edit', courseforEdit)
  }

  public handleDelete(id: number) {
    console.log('course id', id)
  } 

  public ngOnInit(): void {
    this.courses = coursesData
  }
}
