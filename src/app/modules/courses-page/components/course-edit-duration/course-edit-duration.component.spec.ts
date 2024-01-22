import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditDurationComponent } from './course-edit-duration.component';

describe('CourseEditDurationComponent', () => {
  let component: CourseEditDurationComponent;
  let fixture: ComponentFixture<CourseEditDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditDurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
