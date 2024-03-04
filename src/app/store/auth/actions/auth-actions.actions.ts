import { createAction, props } from '@ngrx/store';
import {UserInfo} from "../../../interfaces/user";

export const login = createAction(
  '[Auth] Login',
  props<{ user: UserInfo }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ name: string, id: number }>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{ data: object }>()
);

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any }>()
);

export const getUserInfo = createAction(
  '[Auth] getUserInfo',
  props<{ token?: string }>()
);

export const getUserInfoSuccess = createAction(
  '[Auth] GetUserInfo Success',
  props<{ data: string}>()
);

export const getUserInfoFailure = createAction(
  '[Auth] GetUserInfo Failure',
  props<{ error: any }>()
);
