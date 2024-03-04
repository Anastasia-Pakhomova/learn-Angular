import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import {CoursesService} from "../../../services/courses/courses.service"
import { State } from '../..'
import * as fromCoursesActions from '../actions/courses-actions.actions'
import {selectCoursesCount} from '../selectors/courses-selectors.selectors'
import {Router} from "@angular/router";


@Injectable()
export class CoursesEffects {

  public coursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.getCourses),
    withLatestFrom(this.store.select(selectCoursesCount)),
    switchMap(([{ limit }, count]) => this.coursesService.getList(limit || count + 5).pipe(
      map((data) => fromCoursesActions.getCoursesSuccess({ data })),
      catchError((error) => of(fromCoursesActions.getCourseFailure({ error })))
    ))
  ))

  public searchCourses$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.searchCourses),
    switchMap(({ text }) => this.coursesService.searchCourses(text).pipe(
      map((data) => fromCoursesActions.searchCoursesSuccess({ data })),
      catchError((error) => of(fromCoursesActions.searchCoursesFailure({ error })))
    ))
  ))

  public authorsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.getAuthors),
    switchMap(() => this.coursesService.getAuthors().pipe(
      map((data) => fromCoursesActions.getAuthorsSuccess({ data })),
      catchError((error) => of(fromCoursesActions.getAuthorsFailure({ error })))
    ))
  ))

  public getAuthorsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.getAuthorsSuccess),
    tap(() => console.log('Authors loaded'))
  ), { dispatch: false })

  public createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.createCourse),
    switchMap(({ course }) => this.coursesService.createCourse(course).pipe(
      map((data) => {
        this.router.navigate(['/courses'])
        return fromCoursesActions.createCourseSuccess({ data })
      }),
      catchError((error) => of(fromCoursesActions.createCourseFailure({ error })))
    ))
  ))

  public getCourse$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.getCourse),
    switchMap(({id}) => this.coursesService.getCourse(id).pipe(
      map((data) => fromCoursesActions.getCourseSuccess({ data })),
      catchError((error) => of(fromCoursesActions.getCourseFailure({ error })))
    ))
  ))

  public updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.updateCourse),
    switchMap(({id, course}) => this.coursesService.updateCourse(id, course).pipe(
      map((data) => {
        this.router.navigate(['/courses'])
        return fromCoursesActions.updateCourseSuccess({ data })
      }),
      catchError((error) => of(fromCoursesActions.updateCourseFailure({ error })))
    ))
  ))

  public removeCourse$ = createEffect(() => this.actions$.pipe(
    ofType(fromCoursesActions.removeCourse),
    switchMap(({id}) => this.coursesService.removeCourse(id).pipe(
      map((data) => fromCoursesActions.removeCourseSuccess({ data })),
      catchError((error) => of(fromCoursesActions.removeCourseFailure({ error })))
    ))
  ))

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private readonly store: Store<State>,
    private router: Router
  ) {}
}
