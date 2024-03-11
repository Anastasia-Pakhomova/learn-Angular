import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListItemComponent } from './course-list-item.component';
import {DurationPipe} from "../../../../pipes/duration.pipe";
import {ButtonModule} from "primeng/button";
import {CourseBorderDirective} from "../../directives/course-border.directive";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import '@angular/common/locales/global/ru';

describe('CourseListItemComponent', () => {
  let component: CourseListItemComponent;
  let fixture: ComponentFixture<CourseListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListItemComponent, CourseBorderDirective, ],
      imports: [DurationPipe, ButtonModule, RouterModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseListItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      title: '',
      dateCreation: new Date(),
      duration: 120,
      description: '',
      topRated: false,
      authors: []
    }
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
