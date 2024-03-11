import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesPageComponent } from './courses-page.component';
import {initialState, State} from "../../store/courses/reducers/courses-reducer.reducer";
import {MockStore, createMockStore, provideMockStore} from "@ngrx/store/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

// function setup<T>(): { default: () => any; build: () => T; store: MockStore<State>, [key: string]: any } {
//   const initialState = {
//     isLoading: false,
//     courses: [],
//     authors: [],
//     course: null } as unknown as State;
//   const store: MockStore<State> = createMockStore({ initialState })
//   const builder = {
//     store,
//     default(): any {
//       return builder;
//     },
//     build(): any {
//       return new CoursesPageComponent(store);
//     }
//   };
//   return builder;
// }

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let store: MockStore<State> = createMockStore({ initialState })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      providers: [ provideMockStore({ initialState }) ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
