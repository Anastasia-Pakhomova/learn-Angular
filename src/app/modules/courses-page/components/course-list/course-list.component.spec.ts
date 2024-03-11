import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import {OrderByPipe} from "../../../../pipes/order-by.pipe";
import {ButtonModule} from "primeng/button";

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      imports:  [OrderByPipe, ButtonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onLoad', () => {
    component.courseList.length = 5;
    spyOn(component.loadList, 'emit');
    component.onLoad();
    expect(component.loadList.emit).toHaveBeenCalledOnceWith(component.courseList.length+5);
  });

  it('should handleEdit', () => {
    const course = {
      title: "test test new",
      description: "test test new",
      duration: 135,
      dateCreation: new Date("2024-03-05T21:00:00.000Z"),
      authors: [
        {
          id: 12,
          name: "Sandra Bullock"
        }
      ],
      id: 1709538699384,
      topRated: false
    }
    spyOn(component.editCourse, 'emit');
    component.handleEdit(course);
    expect(component.editCourse.emit).toHaveBeenCalledOnceWith(course);
  });

  it('should handleDelete', () => {
    const id = 1709035604513;
    spyOn(component.deleteCourse, 'emit');
    component.handleDelete(id);
    expect(component.deleteCourse.emit).toHaveBeenCalledOnceWith(id);
  });
});
