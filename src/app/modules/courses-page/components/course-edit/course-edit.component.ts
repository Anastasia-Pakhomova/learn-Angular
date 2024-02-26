import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseInterface } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { authorsValidator } from "../../validation/validation";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
  public formTitle = ''
  // public courseName =''
  // public courseDescription =''
  // public courseDateCreation: Date = new Date()
  // public duration = 0
  private route =''

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder
    ) {}

  public get title(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  public get description(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  public get courseDuration(): FormControl {
    return this.courseForm.get('duration') as FormControl;
  }

  public get duration(): number {
    return this.courseForm.value.duration
  }

  public get dateCreation(): FormControl {
    return this.courseForm.get('dateCreation') as FormControl;
  }

  public get authors(): FormControl {
    return this.courseForm.get('authors') as FormControl;
  }

  public courseForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [0, [Validators.required, Validators.min(30)]],
    dateCreation: [new Date(), [Validators.required]],
    //authors: [[''], [Validators.required, authorsValidator]]
  })

  getDuration(duration: number) {
    this.courseForm.controls['duration'].setValue(duration)
  }

   public save() {
    console.log(this.courseForm.value.duration)
    if(this.route) {
      const newCourse: CourseInterface = {
        ...this.courseForm.value,
        id: new Date().getTime(),
        topRated: false,
      }
      if(this.route === 'new') {
        this.coursesService.createCourse(newCourse).subscribe(response => {
          if(response) this.router.navigate(['/courses'])
        })
      }
      else this.coursesService.updateCourse(+this.route, newCourse).subscribe(response => console.log(response))
    }
  }

  getCourseInfo(url: string): void {
    if (url.length) {
      if(this.route === 'new') this.formTitle = 'Новый курс'
      else {
        this.formTitle = 'Редактирование курса'
        this.coursesService.getCourse(+this.route)
        .subscribe((data: CourseInterface[]) => {
          const course = data[0]
          this.courseForm.setValue({
            ...course,
            dateCreation: new Date(course.dateCreation),
            //duration: this.getDuration(course.duration)
          })
          //this.getDuration(course.duration)
          this.changeDetectorRef.detectChanges();
        })
      }
    }
  }

  ngOnInit(): void {
      const urlArr = this.router.routerState.snapshot.url.split('/')
      urlArr.shift()
      this.route = urlArr[1]
      this.getCourseInfo(urlArr[1])
  }
}
