import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseInterface } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';
import {BehaviorSubject, debounceTime, filter, merge, Observable, of, Subject, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService, MessageService, FilterPipe]
})
export class CoursesPageComponent {
  public searchCourse: any;
  public limit = 5

  private refresh$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  private search$: Subject<CourseInterface[]> = new Subject<CourseInterface[]>();
  public courses$: Observable<CourseInterface[]> = merge(
    this.refresh$.pipe(switchMap((limit) =>  this.coursesService.getList(limit))),
    this.search$
  );

  constructor(
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

  filterCourses(text: string) {
    if(text.trim().length === 0) this.refresh$.next(this.limit)
    of(text).pipe(
      filter(text => !!text && text.length>=3),
      debounceTime(250),
      switchMap(text => this.coursesService.searchCourses(text).pipe(
        tap(courses => this.search$.next(courses))
      ))
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
            this.coursesService.removeCourse(id).subscribe(() => this.refresh$.next(this.limit))
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
    this.refresh$.next(count)
  }

}
