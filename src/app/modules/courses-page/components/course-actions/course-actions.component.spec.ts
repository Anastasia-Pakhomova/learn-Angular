import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActionsComponent } from './course-actions.component';
import {FormsModule} from "@angular/forms";

describe('CourseActionsComponent', () => {
  let component: CourseActionsComponent;
  let fixture: ComponentFixture<CourseActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseActionsComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
