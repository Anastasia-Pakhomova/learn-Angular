import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAuthor } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-edit-authors',
  templateUrl: './course-edit-authors.component.html',
  styleUrls: ['./course-edit-authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditAuthorsComponent {
  @Input() parentForm!: FormGroup
  @Input() authorsList: IAuthor[] = []

  filteredAuthors: IAuthor[] = []

  filterAuthors(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    this.authorsList.forEach(item => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item)
    }
    })

    this.filteredAuthors = filtered;
    console.log(this.authors)
  }

  public get authors(): FormControl {
    return this.parentForm.get('authors') as FormControl;
  }

}
