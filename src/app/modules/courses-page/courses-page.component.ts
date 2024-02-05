import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseInterface } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService, MessageService, FilterPipe]
})
export class CoursesPageComponent implements OnInit {
  public courseList: CourseInterface[] = []
  public searchCourse: any;
  public filteredCourses: CourseInterface[] = []
  public limit = 5

  constructor(
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

  filterCourses(text: string) {
   this.coursesService.searchCourses(text)
     .subscribe(data => {
       this.courseList = data.map((item: CourseInterface) => {
         return {...item, dateCreation: new Date(item.dateCreation)}
       } )
       this.filteredCourses = this.courseList
     })
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
            this.coursesService.removeCourse(id).subscribe(response => this.getCourseList(this.limit))
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
    this.getCourseList(count)
  }

   getCourseList(limit: number) {
    this.coursesService.getList(limit)
    .subscribe(data => {
      this.courseList = data.map((item: CourseInterface) => {
       return {...item, dateCreation: new Date(item.dateCreation)}
      } )
      this.filteredCourses = this.courseList
    })
  }

  ngOnInit(): void {
    this.getCourseList(this.limit)
  }

}
