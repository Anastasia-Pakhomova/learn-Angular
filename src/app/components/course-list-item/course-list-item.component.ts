import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CourseInterface } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent {
  
  @Input() course!: CourseInterface
  @Output() edit = new EventEmitter<number>()
  @Output() delete = new EventEmitter<number>()

  public convertDuration(value: number) {
    let hours = Math.floor(value/60)
    let minutes = Math.round(((value/60) - Math.floor(value/60))*60)
    return `${hours} часа ${minutes} минут`
  }

  public onEdit(id: number) {
    this.edit.emit(id)
  }

  public onDelete(id: number) {
    this.delete.emit(id)
  }
}
