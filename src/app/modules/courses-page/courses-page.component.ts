import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CourseInterface } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CoursesPageComponent implements OnInit {
  public courseList: CourseInterface[] = []
  public searchCourse: any;
  public filteredCourses: CourseInterface[] = []

  // private refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  // public list$: Observable<CourseInterface[]> = this.refresh$.pipe(
  //   switchMap(() => this.coursesService.getList())
  // );

  constructor(
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

    filterCourses(text: any) {
      if(typeof this.searchCourse === 'string') {
        this.filteredCourses = this.filterPipe.transform(this.courseList, this.searchCourse)
      }
    }

  resetFilter() {
    this.searchCourse=''
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
            this.coursesService.removeCourse(id).subscribe(response => this.getCourseList())
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

   getCourseList() {
    this.coursesService.getList()
    .subscribe(data => {
      this.courseList = data.map((item: CourseInterface) => {
       return {...item, dateCreation: new Date(item.dateCreation)}
      } )
      this.filteredCourses = this.courseList
    })
      // this.list$.subscribe(data => {
      //   this.courseList = data.map((item: CourseInterface) => {
      //          return {...item, dateCreation: new Date(item.dateCreation)}
      //         } )
      //         this.filteredCourses = this.courseList
      // })
  }

  ngOnInit(): void {
    this.getCourseList() 
  }

}
