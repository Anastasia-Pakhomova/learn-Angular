import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string = ''
  public password: string = ''
  public isAuthenticated: boolean = false

 // @Output() login = new EventEmitter<UserInfo>()

  constructor(private authService: AuthService, private router: Router) {}

  checkAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  public login(user: UserInfo) {
    this.authService.login(user)
    this.checkAuthenticated()
    if(this.isAuthenticated) {
      this.router.navigate(['/courses'])
      console.log('Выполнен вход в систему')
    }
  }

  public submit() {
    if(this.email.length && this.password.length) {
      let emailParts = this.email.split('@')
      const user = { 
        login: emailParts[0], 
        token: this.password, 
        email: this.email 
      };
      this.login(user)
    }
  }

  ngOnInit(): void {
    this.checkAuthenticated()
    if(this.isAuthenticated) this.router.navigate(['/courses'])
  }
}
