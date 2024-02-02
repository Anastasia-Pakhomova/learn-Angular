import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CourseInterface } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
  public title: string = ''
  public courseName =''
  public courseDescription =''
  public courseDate: Date = new Date()
  public courseDuration: number = 0
  private route: string =''

  constructor(private coursesService: CoursesService, private router: Router, private changeDetectorRef: ChangeDetectorRef,) {}
 
  getDuration(duration: number) {
    this.courseDuration = duration
  }

   public save() {
    if(this.route) {
      const newCourse = {
        id: new Date().getTime(),
        title: this.courseName,
        dateCreation: this.courseDate,
        duration: this.courseDuration,
        description: this.courseDescription,
        topRated: false
      }
      if(this.route === 'new') this.coursesService.createCourse(newCourse).subscribe(response => console.log(response))
      else this.coursesService.updateCourse(+this.route, newCourse).subscribe(response => console.log(response))
    
    }
  }

  getCourseInfo(url: string): void {
    if (url.length) {
      if(this.route === 'new') this.title = 'Новый курс'
      else {
        this.title = 'Редактирование курса'
        this.coursesService.getCourse(+this.route)
        .subscribe((data: CourseInterface[]) => {
          console.log("DATA", data)
          const course = data[0]
          this.courseName = course.title
          this.courseDescription = course.description
          this.courseDate =  new Date(course.dateCreation)
          this.courseDuration = course.duration
          this.getDuration(course.duration)
          this.changeDetectorRef.detectChanges();
        })
      }
    }
  }

  ngOnInit(): void {
      let urlArr = this.router.routerState.snapshot.url.split('/')
      urlArr.shift()
      this.route = urlArr[1]
      this.getCourseInfo(urlArr[1])
  }
}
