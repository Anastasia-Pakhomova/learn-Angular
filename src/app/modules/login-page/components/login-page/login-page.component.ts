import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email = ''
  public password = ''
  public isAuthenticated = false

  constructor(private authService: AuthService, private router: Router) {}

  checkAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  public login(user: UserInfo) {
    this.authService.login(user)
      .subscribe(data => {
        console.log(data)
        const userInfo = {
          id: data.id,
          token: data.token
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.checkAuthenticated()
        if(this.isAuthenticated) {
          this.router.navigate(['/courses'])
          console.log('Выполнен вход в систему')
        }
      })
  }

  public submit() {
    if(this.email.length && this.password.length) {
      const emailParts = this.email.split('@')
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
