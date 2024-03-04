import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth-actions.actions';

export const authReducerFeatureKey = 'auth';

export interface State {
  isLoading: boolean
  isAuthenticated: boolean
  userName: string
  token: string
}

export const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  userName: '',
  token: '',
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({...state, isLoading: true})),
  on(AuthActions.loginSuccess, (state, {data}) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    token: data,
  })),
  on(AuthActions.loginFailure, (state) => ({...state, isLoading: false})),
  on(AuthActions.logout, (state) => ({...state, isLoading: true})),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    userName: '',
    token: ''
  })),
  on(AuthActions.logoutFailure, (state) => ({...state, isLoading: false})),
  on(AuthActions.getUserInfo, (state) => ({...state, isLoading: true})),
  on(AuthActions.getUserInfoSuccess, (state, {data}) => ({...state, isLoading: false, userName: data})),
  on(AuthActions.getUserInfoFailure, (state) => ({...state, isLoading: false})),
);

