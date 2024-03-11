import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthEffects } from './auth-effects.effects';
import {HttpClientModule} from "@angular/common/http";
import {createMockStore, MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialState, State} from "../reducers/auth-reducer.reducer";

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let store: MockStore<State> = createMockStore({ initialState })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ],
      imports: [HttpClientModule],
    });

    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
