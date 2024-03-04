import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseInterface, IAuthor } from 'src/app/interfaces/course';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { authorsValidator } from "../../validation/validation";
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import { State } from 'src/app/store';
import {selectAuthors, selectCourse} from "src/app/store/courses/selectors/courses-selectors.selectors";
import {createCourse, getAuthors, getCourse, updateCourse} from "src/app/store/courses/actions/courses-actions.actions";

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
  public formTitle = ''
  private route =''
  public authorsList: Observable<IAuthor[]> = this.store.select(selectAuthors)

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private store: Store<State>
    ) {}

  public get title(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  public get description(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  public get dateCreation(): FormControl {
    return this.courseForm.get('dateCreation') as FormControl;
  }

  public courseForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [0, [Validators.required, Validators.min(30), Validators.pattern(/^\d+$/)]],
    dateCreation: [new Date(), [Validators.required]],
    authors: [[], [Validators.required, authorsValidator]]
  })

  getDuration(duration: number) {
    this.courseForm.controls['duration'].setValue(duration)
  }

   public save() {
    console.log(this.courseForm)
    if(this.route) {
      const newCourse: CourseInterface = {
        ...this.courseForm.value,
        id: new Date().getTime(),
        topRated: false,
      }
      if(this.route === 'new') {
        this.store.dispatch(createCourse({course: newCourse}))
      }
      else {
        this.store.dispatch(updateCourse({id: +this.route, course: newCourse}))
      }
    }
  }

  getCourseInfo(): void {
    if(this.route === 'new') this.formTitle = 'Новый курс'
    else {
      this.formTitle = 'Редактирование курса'
      this.store.select(selectCourse)
        .subscribe((data: CourseInterface|null) => {
          if(data) {
            this.courseForm.setValue({
              title: data.title,
              dateCreation: new Date(data.dateCreation),
              duration: data.duration,
              description: data.description,
              authors: data.authors ?? [],
            })
            this.changeDetectorRef.detectChanges();
          }
        })
    }
  }

  ngOnInit(): void {
      const urlArr = this.router.routerState.snapshot.url.split('/')
      urlArr.shift()
      this.route = urlArr[1]
      if(this.route !== 'new')this.store.dispatch(getCourse({id: +this.route}))
      if(this.route) this.getCourseInfo()
      this.store.dispatch(getAuthors())
  }
}
