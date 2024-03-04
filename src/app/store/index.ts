import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromCourses from './courses/reducers/courses-reducer.reducer'
import * as fromAuth from './auth/reducers/auth-reducer.reducer'


export interface State {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.State
  [fromAuth.authReducerFeatureKey]: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.reducer,
  [fromAuth.authReducerFeatureKey]: fromAuth.reducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
