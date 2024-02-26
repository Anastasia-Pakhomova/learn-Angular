import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-course-edit-duration',
  templateUrl: './course-edit-duration.component.html',
  styleUrls: ['./course-edit-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditDurationComponent{
  @Input() courseDuration = 0
  @Output() durationChange = new EventEmitter<number>();
  @Input() parentForm!: FormGroup

  handleChange() {
    this.durationChange.emit(this.courseDuration);
  }
}
