import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseInterface } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { debounceTime, filter, Observable, of, tap} from "rxjs";
import { State } from 'src/app/store';
import {getCourses, searchCourses, removeCourse} from "../../store/courses/actions/courses-actions.actions";
import {selectCourses} from "../../store/courses/selectors/courses-selectors.selectors";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService, MessageService, FilterPipe]
})
export class CoursesPageComponent implements OnInit {
  public searchCourse: any;
  public limit = 5

  public courses$: Observable<CourseInterface[]> = this.store.select(selectCourses);

  constructor(
    private filterPipe: FilterPipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store<State>
    ) {}

  filterCourses(text: string) {
    if(text.trim().length === 0) this.store.dispatch(getCourses({limit: this.limit}))
    of(text).pipe(
      filter(text => !!text && text.length>=3),
      debounceTime(250),
      tap(value => this.store.dispatch(searchCourses({text: value.toLowerCase()})))
    ).subscribe()
  }

  resetFilter() {
    this.searchCourse=''
    this.filterCourses('')
  }

  confirm(id: number) {
    this.confirmationService.confirm({
        header: 'Удалить курс?',
        message: 'Вы уверены, что хотите удалить курс?',
        acceptLabel: 'Удалить',
        rejectLabel: 'Отмена',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-sm p-button-text',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.store.dispatch(removeCourse({id}))
            this.store.dispatch(getCourses({limit: this.limit}))
            this.messageService.add({ severity: 'success', summary: 'Курс удален', detail: 'Вы подтвердили удаление курса', life: 3000 });

        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Отмена удаления', detail: 'Вы отменили удаление курса', life: 3000 });
        }
    });
}

  public handleRemove(id: number) {
    this.confirm(id)
  }

   public handleUpdate(course: CourseInterface) {
    console.log('course for edit', course)
  }

  public handleLoad(count: number) {
    this.store.dispatch(getCourses({limit: count}))
  }

  ngOnInit(): void {
    this.store.dispatch(getCourses({limit: this.limit}))
  }

}
