import { HeaderComponent } from './header.component';
import {createMockStore, MockStore} from "@ngrx/store/testing";
import { State } from 'src/app/store';
import {logout} from "../../../../store/auth/actions/auth-actions.actions";

function setup<T>(): { default: () => any; build: () => T; store: MockStore<State>, [key: string]: any } {
  const initialState = {
    isLoading: false,
    isAuthenticated: false,
    userName: '',
    token: '', } as unknown as State;
  const store: MockStore<State> = createMockStore({ initialState })
  const builder = {
    store,
    default(): any {
      return builder;
    },
    build(): any {
      return new HeaderComponent(store);
    }
  };
  return builder;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  const { build, store } = setup<HeaderComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout', () => {
    component.userInfo = {token: "oceanauticatest+43015", id: 1}
    spyOn(store, 'dispatch');
    component.handleLogout('oceanauticatest+43015');

    expect(store.dispatch).toHaveBeenCalledOnceWith(logout({name: 'oceanauticatest+43015', id: 1}));
  });
});
