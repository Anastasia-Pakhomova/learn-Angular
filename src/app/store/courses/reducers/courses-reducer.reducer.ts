import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from '../actions/courses-actions.actions';
import {CourseInterface, IAuthor} from "../../../interfaces/course";

export const coursesReducerFeatureKey = 'courses';

export interface State {
  isLoading: boolean
  courses: CourseInterface[]
  authors: IAuthor[]
  course: CourseInterface | null
}

export const initialState: State = {
  isLoading: false,
  courses: [],
  authors: [],
  course: null
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.getCourses, (state) => ({...state, isLoading: true})),
  on(CoursesActions.getCoursesSuccess, (state, {data}) => ({...state, isLoading: false, courses: [...data]})),
  on(CoursesActions.getCoursesFailure, (state) => ({...state, isLoading: false})),
  on(CoursesActions.getAuthors, (state) => ({...state, isLoading: true})),
  on(CoursesActions.getAuthorsSuccess, (state, {data}) => ({...state, isLoading: false, authors: [...data]})),
  on(CoursesActions.getAuthorsFailure, (state) => ({...state, isLoading: false})),
  on(CoursesActions.searchCourses, (state) => ({...state, isLoading: true})),
  on(CoursesActions.searchCoursesSuccess, (state, {data}) => ({...state, isLoading: false, courses: [...data]})),
  on(CoursesActions.searchCoursesFailure, (state) => ({...state, isLoading: false})),
  on(CoursesActions.getCourse, (state) => ({...state, isLoading: true})),
  on(CoursesActions.getCourseSuccess, (state, {data}) => ({...state, isLoading: false, course: {...data}})),
  on(CoursesActions.getCourseFailure, (state) => ({...state, isLoading: false})),
);

