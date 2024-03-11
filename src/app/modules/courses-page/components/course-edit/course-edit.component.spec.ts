import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CourseEditComponent } from './course-edit.component';
import { MockStore, provideMockStore} from "@ngrx/store/testing";
import { State} from "../../../../store/courses/reducers/courses-reducer.reducer";
import {CalendarModule} from "primeng/calendar";
import {DurationPipe} from "../../../../pipes/duration.pipe";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy} from "@angular/core";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {selectAuthors, selectCourse} from "../../../../store/courses/selectors/courses-selectors.selectors";
import {getCourse} from "../../../../store/courses/actions/courses-actions.actions";
import {CourseEditDurationComponent} from "../course-edit-duration/course-edit-duration.component";
import {CourseEditAuthorsComponent} from "../course-edit-authors/course-edit-authors.component";
import {AutoCompleteModule} from "primeng/autocomplete";

describe('CourseEditComponent', () => {
  let component: CourseEditComponent;
  let fixture: ComponentFixture<CourseEditComponent>;
  const initialState: State = {
    isLoading: false,
    courses: [],
    authors: [],
    course: null
  };
  const selectors = [
    { selector: selectAuthors, value: [{id: 1, name: "Alex Lo"}, {id: 2, name: "Alex Ivanov"}] },
    { selector: selectCourse, value:
      {
        title: "new course",
        description: "course description",
        duration: 135,
        dateCreation: new Date("2024-03-05T21:00:00.000Z"),
        authors: [
          {
            id: 5,
            name: "Anna Katz"
          }
        ],
        id: 1709538699384,
        topRated: false
      }
     },
  ]
  let storeFake: MockStore<State>
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditComponent, CourseEditDurationComponent, CourseEditAuthorsComponent ],
      imports: [CalendarModule, DurationPipe, ReactiveFormsModule, RouterTestingModule, AutoCompleteModule],
      providers: [  FormBuilder, provideMockStore({ initialState, selectors}), ],
    })
      .overrideComponent(CourseEditComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEditComponent);
    component = fixture.componentInstance;
    storeFake = TestBed.inject(MockStore)
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 fields initially', () => {
    const element = fixture.debugElement;
    const fields = element.queryAll(By.css('.courseForm-field'));
    expect(fields.length).toBe(5);
  });

  it('should submit form', (done) => {
    const form = fixture.debugElement.query(By.css('form'));
    spyOn(component, 'save');
    component.courseForm.patchValue(
      {
        title: 'test course',
        description: 'test course',
        duration: 120,
        dateCreation: new Date(),
        authors: [
          {
            id: 12,
            name: "Sandra Bullock"
          }
        ]
      }
    )

    form.triggerEventHandler('ngSubmit');
    fixture.whenStable().then(() => {
      expect(component.save).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should redirect to courses on button click', () => {
    const element = fixture.debugElement;
    const navSpy = spyOn(router, 'navigateByUrl');
    const button = element.query(By.css('.btn_cancel'));

    button.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(navSpy).toHaveBeenCalledWith(router.createUrlTree(['/courses']), jasmine.anything())
    });
  });

  it('check textContent h2',  () => {
    component.formTitle = 'Новый курс'
    const title = fixture.debugElement.nativeElement.querySelector('h2');
    fixture.detectChanges()
    expect(title.textContent).toContain(component.formTitle);
  });

  it('should initialize form with default values for add', () => {
    fixture.detectChanges();
    component.ngOnInit()

    expect(component.courseForm.value).toEqual({
      title: '',
      description: '',
      duration: 0,
      dateCreation: '',
      authors: []
    });
  });

  it('should form fill if edit course',(done) => {
    component.route = '1709538699384'
    storeFake.dispatch(getCourse({id: +component.route}))
    component.getCourseInfo()
    fixture.detectChanges();
    const fields = fixture.debugElement.nativeElement.querySelectorAll('.field')
    const dateCreationField = fixture.debugElement.nativeElement.querySelector('#dateCreation input')
    const authorsField = fixture.debugElement.nativeElement.querySelector('#authors ul .p-autocomplete-token-label')

    expect(component.formTitle).toEqual('Редактирование курса')
    expect(dateCreationField.value).toBeTruthy()
    expect(authorsField.textContent).toBeTruthy()
    fields.forEach((item:  HTMLInputElement) => expect(item.value).toBeTruthy())
    done()
  });

  it('should update authors list',done  => {
    const authors = [{id: 1, name: "Alex Lo"}, {id: 2, name: "Alex Ivanov"}]
    storeFake.overrideSelector('selectAuthors', authors)
    component.authorsList = storeFake.select('selectAuthors')
    fixture.detectChanges();

    component.authorsList.subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(authors);
      done();
    });
  });
});
