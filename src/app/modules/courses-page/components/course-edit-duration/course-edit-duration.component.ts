import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

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

  public get duration(): FormControl {
    return this.parentForm.get('duration') as FormControl;
  }
}
