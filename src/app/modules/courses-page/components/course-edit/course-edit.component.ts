import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent {
  public title: string = 'Редактирование курса'
  @Input() courseName =''
  @Input() description =''
  @Input() date: Date = new Date()
  @Input() flag: boolean = false
  @Output() flagChange = new EventEmitter<boolean>()

  public cancel() {
    this.flag = false
    this.flagChange.emit()
  }
  public save() {}
}
