import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-actions',
  templateUrl: './course-actions.component.html',
  styleUrls: ['./course-actions.component.scss']
})
export class CourseActionsComponent implements DoCheck {
  public searchCourse: any

  ngDoCheck() {
    // console.log('searchCourse', typeof this.searchCourse)
  }
}
