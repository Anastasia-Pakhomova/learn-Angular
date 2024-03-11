import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import {createMockStore, MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialState, State} from "../../../../store/auth/reducers/auth-reducer.reducer";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore<State> = createMockStore({ initialState })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [ FormsModule, PasswordModule ],
      providers: [ provideMockStore({ initialState }) ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
