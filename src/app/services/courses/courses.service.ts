import { Injectable } from '@angular/core';
import { CourseInterface, IAuthor } from 'src/app/interfaces/course';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterPipe} from "../../pipes/filter.pipe";
import {environment} from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   private baseUrl = environment.apiUrl

  constructor(private httpClient: HttpClient, private filterPipe: FilterPipe,) {}

  public getList(limit= 5): Observable<CourseInterface[]> {
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
    return this.httpClient.post<CourseInterface>(`${this.baseUrl}/courses`, course)
  }

  public getCourse(id: number): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`, {
        params: new HttpParams().set('id', id)
    });
  }

  public updateCourse(id: number, course: CourseInterface): Observable<CourseInterface> {
    return this.httpClient.put<CourseInterface>(`${this.baseUrl}/courses/${id}`, course);
  }

  public removeCourse(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/courses/${id}`)
  }

  public searchCourses(text: string): Observable<CourseInterface[]> {
    return this.httpClient.get<CourseInterface[]>(`${this.baseUrl}/courses`,
      {
        params: new HttpParams()
          .set('q', text.trim())
      })
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>(`${this.baseUrl}/authors`)
  }
}

