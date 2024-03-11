import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditAuthorsComponent } from './course-edit-authors.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {authorsValidator} from "../../validation/validation";

describe('CourseEditAuthorsComponent', () => {
  let component: CourseEditAuthorsComponent;
  let fixture: ComponentFixture<CourseEditAuthorsComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditAuthorsComponent ],
      imports: [ AutoCompleteModule, ReactiveFormsModule],
      providers: [ { provide: FormBuilder, useValue: formBuilder } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditAuthorsComponent);
    component = fixture.componentInstance;
    component.parentForm = formBuilder.group({
      authors: [[], [Validators.required, authorsValidator]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
