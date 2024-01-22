import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-edit-duration',
  templateUrl: './course-edit-duration.component.html',
  styleUrls: ['./course-edit-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditDurationComponent {
  @Input() duration: number = 0
}
