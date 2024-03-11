import { reducer, initialState } from './auth-reducer.reducer';
import * as AuthActions from '../actions/auth-actions.actions';

describe('AuthReducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  it('should update state on login', () => {
    const expected = { ...initialState, isLoading: true };
    const action = AuthActions.login({user: {
        login: 'Ann',
        token: 'Pas123Ann',
        email: 'Ann@mail.ru',
        password: 'Pas123'
    }});

    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('should update state on loginSuccess', () => {
    const data = 'Pas123Ann';
    const prevState = { ...initialState, isLoading: true };
    const expected = { ...initialState, isLoading: false,  isAuthenticated: true, token: data };

    expect(reducer(prevState, AuthActions.loginSuccess({ data}))).toEqual(expected);
  });

  it('should update state on logout', () => {
    const prevState = { ...initialState, isLoading: false,  isAuthenticated: true, token: 'dfghnj6523oceanauticatest+43015'  };
    const expected = { ...initialState, isLoading: true,  isAuthenticated: true, token: 'dfghnj6523oceanauticatest+43015' };

    expect(reducer(prevState, AuthActions.logout({ name: 'oceanauticatest+43015', id: 4}))).toEqual(expected);
  });

  it('should update state on logoutSuccess', () => {
    const prevState = { ...initialState, isLoading: true,  isAuthenticated: true, token: 'dfghnj6523oceanauticatest+43015'  };
    const expected = {
      ...initialState,
      isLoading: false,
      isAuthenticated: false,
      userName: '',
      token: ''
    };

    expect(reducer(prevState, AuthActions.logoutSuccess({ data: {}}))).toEqual(expected);
  });

  it('should update state on getUserInfo', () => {
    const tokenString = 'uhkj,m52oceanauticatest+43015';
    const prevState = { ...initialState, isLoading: false,  isAuthenticated: true, token: 'uhkj,m52oceanauticatest+43015' };
    const expected = { ...initialState, isLoading: true,  isAuthenticated: true, token: 'uhkj,m52oceanauticatest+43015' };
    expect(reducer(prevState, AuthActions.getUserInfo({ token: tokenString}))).toEqual(expected);
  });

  it('should update state on getUserInfoSuccess', () => {
    const data = 'oceanauticatest+43015';
    const prevState = { ...initialState, isLoading: true,  isAuthenticated: true, token: 'uhkj,m52oceanauticatest+43015' };
    const expected = {
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      token: 'uhkj,m52oceanauticatest+43015',
      userName: data
    }
    expect(reducer(prevState, AuthActions.getUserInfoSuccess({ data}))).toEqual(expected);
  });
});
