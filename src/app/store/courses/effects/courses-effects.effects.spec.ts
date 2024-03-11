import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoursesEffects } from './courses-effects.effects';
import {HttpClientModule} from "@angular/common/http";
import {createMockStore, MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialState, State} from "../reducers/courses-reducer.reducer";

describe('CoursesEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;
  let store: MockStore<State> = createMockStore({ initialState })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ],
      imports: [HttpClientModule],
    });

    effects = TestBed.inject(CoursesEffects);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
