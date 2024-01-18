import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public email: string = ''
  public password: string = ''

  @Output() login = new EventEmitter<UserInfo>()

  public submit() {
    if(this.email.length && this.password.length) {
      let emailParts = this.email.split('@')
      const user = { 
        login: emailParts[0], 
        token: this.password, 
        email: this.email 
      };
      this.login.emit(user)
    }
  }
}
