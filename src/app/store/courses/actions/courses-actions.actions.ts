import { createAction, props } from '@ngrx/store';
import {CourseInterface, IAuthor} from "../../../interfaces/course";

export const getCourses = createAction(
  '[Courses] Get Courses',
  props<{ limit: number }>()
);

export const getCoursesSuccess = createAction(
  '[Courses] Get Courses Success',
  props<{ data: CourseInterface[] }>()
);

export const getCoursesFailure = createAction(
  '[Courses] Get Courses Failure',
  props<{ error: any }>()
);

export const getAuthors = createAction(
  '[Courses] Get Authors'
);

export const getAuthorsSuccess = createAction(
  '[Courses] Get Authors Success',
  props<{ data: IAuthor[] }>()
);

export const getAuthorsFailure = createAction(
  '[Courses] Get Authors Failure',
  props<{ error: any }>()
);

export const searchCourses = createAction(
  '[Courses] SearchCourses',
  props<{ text: string }>()
);

export const searchCoursesSuccess = createAction(
  '[Courses] SearchCourses Success',
  props<{ data: CourseInterface[] }>()
);

export const searchCoursesFailure = createAction(
  '[Courses] SearchCourses Failure',
  props<{ error: any }>()
);

export const createCourse = createAction(
  '[Courses] CreateCourse',
  props<{ course: CourseInterface }>()
);

export const createCourseSuccess = createAction(
  '[Courses] CreateCourse Success',
  props<{ data: CourseInterface }>()
);

export const createCourseFailure = createAction(
  '[Courses] CreateCourse Failure',
  props<{ error: any }>()
);

export const getCourse = createAction(
  '[Courses] getCourse',
  props<{ id: number }>()
);

export const getCourseSuccess = createAction(
  '[Courses] getCourse Success',
  props<{ data: CourseInterface }>()
);

export const getCourseFailure = createAction(
  '[Courses] getCourse Failure',
  props<{ error: any }>()
);

export const updateCourse = createAction(
  '[Courses] updateCourse',
  props<{ id: number, course: CourseInterface }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] updateCourse Success',
  props<{ data: CourseInterface }>()
);

export const updateCourseFailure = createAction(
  '[Courses] updateCourse Failure',
  props<{ error: any }>()
);

export const removeCourse = createAction(
  '[Courses] removeCourse',
  props<{ id: number }>()
);

export const removeCourseSuccess = createAction(
  '[Courses] removeCourse Success',
  props<{ data: '' }>()
);

export const removeCourseFailure = createAction(
  '[Courses] removeCourse Failure',
  props<{ error: any }>()
);
