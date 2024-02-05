import { Component, DoCheck, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseInterface } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [ConfirmationService, MessageService, FilterPipe],
})
export class CoursesPageComponent implements OnInit, DoCheck {
  public courseList: CourseInterface[] = []
  public searchCourse: any;
  public filteredCourses: CourseInterface[] = []

  constructor(
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

  filterCourses(text: string) {
    return this.filterPipe.transform(this.courseList, text);
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
            this.coursesService.removeCourse(id)
            this.filteredCourses = this.filteredCourses.filter(item => item.id !== id)
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

  ngOnInit(): void {
    this.courseList = this.coursesService.getList()
    this.filteredCourses = this.courseList
  }

  ngDoCheck(): void {
    if(typeof this.searchCourse === 'string') {
      this.filteredCourses = this.filterCourses(this.searchCourse)
    }
  }
}
