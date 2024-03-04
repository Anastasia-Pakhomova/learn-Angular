import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth-reducer.reducer'

export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authReducerFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectUserName = createSelector(
  selectAuthState,
  (state) => state.userName
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
