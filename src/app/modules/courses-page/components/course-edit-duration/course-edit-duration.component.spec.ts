import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditDurationComponent } from './course-edit-duration.component';
import {DurationPipe} from "../../../../pipes/duration.pipe";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

describe('CourseEditDurationComponent', () => {
  let component: CourseEditDurationComponent;
  let fixture: ComponentFixture<CourseEditDurationComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditDurationComponent ],
      imports: [ DurationPipe, ReactiveFormsModule  ],
      providers: [ { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditDurationComponent);
    component = fixture.componentInstance;
    component.parentForm = formBuilder.group({
      duration: [0, [Validators.required, Validators.min(30), Validators.pattern(/^\d+$/)]],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
