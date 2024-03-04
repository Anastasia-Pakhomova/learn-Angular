import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from '../reducers/courses-reducer.reducer'

export const selectCoursesState = createFeatureSelector<fromCourses.State>(fromCourses.coursesReducerFeatureKey);

export const selectCourses = createSelector(
  selectCoursesState,
  (state) => state.courses
);

export const selectCourse = createSelector(
  selectCoursesState,
  (state) => state.course
);

export const selectAuthors = createSelector(
  selectCoursesState,
  (state) => state.authors
);

export const selectCoursesCount = createSelector(
  selectCoursesState,
  (state) => state.courses.length
);
