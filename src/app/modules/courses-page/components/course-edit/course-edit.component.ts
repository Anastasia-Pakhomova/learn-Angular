import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
  public title: string = 'Редактирование курса'
  @Input() courseName =''
  @Input() courseDescription =''
  @Input() courseDate: Date = new Date()
  public courseDuration: number = 0
  private route: string =''
  private routeMain: string =''

  constructor(private coursesService: CoursesService, private router: Router) {}

  
  public save() {
    if(this.route) {
      if(this.route === 'new') this.coursesService.createCourse()
      else this.coursesService.updateCourse(+this.route)
    }
  }

  getCourseInfo(url: string[]): void {
    if (url.length) {
      [this.routeMain, this.route] = url.map((item: string) => item);
      if(this.route) {
        if(this.route === 'new') this.title = 'Новый курс'
        else {
          this.title = 'Редактирование курса'
          let course = this.coursesService.getCourse(+this.route)
          this.courseName = course?.title ?? ''
          this.courseDescription = course?.description ?? ''
          this.courseDate = course?.dateCreation ?? new Date()
          this.courseDuration =course?.duration ?? 0 
        }
      }
    }
  }

  ngOnInit(): void {
      let urlArr = this.router.routerState.snapshot.url.split('/')
      urlArr.shift()
      this.getCourseInfo(urlArr)
  }
}
