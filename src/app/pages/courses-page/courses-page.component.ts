import { Component, DoCheck, OnInit } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';
import { coursesData } from './data';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, DoCheck {
  public courseList: CourseInterface[] = []
  public searchCourse: any;
  public filteredCourses: CourseInterface[] = []

  constructor(private filterPipe: FilterPipe) {}

  filterCourses(text: string) {
    return this.filterPipe.transform(this.courseList, text);
  }

  resetFilter() {
    this.searchCourse=''
  }

  ngOnInit(): void {
    this.courseList = coursesData
    this.filteredCourses = coursesData
  }

  ngDoCheck(): void {
    if(typeof this.searchCourse === 'string') {
      this.filteredCourses = this.filterCourses(this.searchCourse)
    }
  }
}
