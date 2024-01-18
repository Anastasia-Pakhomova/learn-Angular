import { Injectable } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';
import { coursesData } from './data';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   private courses: CourseInterface[] = []
   private courseList: CourseInterface[] = []

  constructor() { 
    this.courses = coursesData
  }

  public getList(): CourseInterface[] {
    return this.courses
  }

  public createCourse() {}

  public getCourse(id: number) {
    let course = this.courses.find(item => item.id === id)
  }

  public updateCourse(id: number) {
    let course = this.courses.find(item => item.id === id)
  }

  public removeCourse(id: number): CourseInterface[] {
    console.log('DELETE id course', id)
    return this.courses
  }
}
