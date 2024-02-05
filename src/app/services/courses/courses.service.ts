import { Injectable } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterPipe} from "../../pipes/filter.pipe";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   private baseUrl = "http://localhost:3000"

  constructor(private httpClient: HttpClient, private filterPipe: FilterPipe,) {}

  public getList(limit= 5): Observable<CourseInterface[]> {
    console.log('GET all courses')
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`,
      {
        params: new HttpParams()
          .set('_start', 0)
          .set('_limit', limit)
          .set('_sort', 'dateCreation')
          .set('_order', 'desc')
      })
  }

  public createCourse(course: CourseInterface): Observable<CourseInterface> {
    console.log('CREATE course')
    return this.httpClient.post<CourseInterface>(`${this.baseUrl}/courses`, course)
  }

  public getCourse(id: number): Observable<CourseInterface[]> {
    console.log('GET course')
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`, {
        params: new HttpParams().set('id', id)
    });
  }

  public updateCourse(id: number, course: CourseInterface): Observable<CourseInterface> {
    console.log('UPDATE course')
    return this.httpClient.put<CourseInterface>(`${this.baseUrl}/courses/${id}`, course);
  }

  public removeCourse(id: number): Observable<any> {
    console.log('DELETE id course', id)
    return this.httpClient.delete(`${this.baseUrl}/courses/${id}`)
  }

  public searchCourses(text: string): Observable<CourseInterface[]> {
    if(!text.trim().length) {
      return this.getList()
    }
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`,
      {
        params: new HttpParams()
          .set('q', text.trim())
      })
  }
}

