import { Injectable } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';
import { coursesData } from './data';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   private baseUrl = "http://localhost:3000"
   private courses: CourseInterface[] = []
   private courseList: CourseInterface[] = []

  constructor(private httpClient: HttpClient) {
    this.courses = coursesData
  }

  public getList(): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`)
  }

  public createCourse() {
    console.log('CREATE course')
  }

  public getCourse(id: number) {
    let course = this.courses.find(item => item.id === id)
    return course
  }

  public updateCourse(id: number) {
    let course = this.courses.find(item => item.id === id)
    console.log('UPDATE course')
  }

  public removeCourse(id: number): CourseInterface[] {
    console.log('DELETE id course', id)
    return this.courses
  }
}
