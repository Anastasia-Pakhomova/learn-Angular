import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent {

  @Input() course!: CourseInterface
  @Output() edit = new EventEmitter<CourseInterface>()
  @Output() delete = new EventEmitter<number>()

  public onEdit(course: CourseInterface) {
    this.edit.emit(course)
  }

  public onDelete(id: number) {
    this.delete.emit(id)
  }
}
