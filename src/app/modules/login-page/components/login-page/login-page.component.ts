import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user';
import { NgForm } from "@angular/forms";
import {Store} from "@ngrx/store";
import { State } from 'src/app/store';
import {login} from "src/app/store/auth/actions/auth-actions.actions";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public isAuthenticated = false

  constructor(private router: Router, private store: Store<State>) {}

  public login(user: UserInfo) {
    this.store.dispatch(login({user}))
  }

  public submit(form: NgForm) {
    if(form.value.email.length && form.value.password.length) {
      const emailParts = form.value.email.split('@')
      const user = {
        login: emailParts[0],
        token: form.value.password+emailParts[0],
        email: form.value.email,
        password: form.value.password
      };
      this.login(user)
    }
  }

}
