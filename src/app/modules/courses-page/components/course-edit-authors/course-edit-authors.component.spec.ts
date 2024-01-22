import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditAuthorsComponent } from './course-edit-authors.component';

describe('CourseEditAuthorsComponent', () => {
  let component: CourseEditAuthorsComponent;
  let fixture: ComponentFixture<CourseEditAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
