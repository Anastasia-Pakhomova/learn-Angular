import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-actions',
  templateUrl: './course-actions.component.html',
  styleUrls: ['./course-actions.component.scss']
})
export class CourseActionsComponent {
  public searchCourse: any
  @Input() searchValue: string | undefined;
  @Output() searchValueChange = new EventEmitter<string>();

  public onSearch() {
    this.searchValueChange.emit(this.searchValue);
  }
}
