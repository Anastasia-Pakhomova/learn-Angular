import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { UserInfo } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title = 'learn-angular';
  public isAuthenticated: boolean = false
  public name: string = ''

  constructor(private authService: AuthService) {}

  checkAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated()
  }

  handleLogin(user: UserInfo) {
    this.authService.login(user)
    this.checkAuthenticated()
    if(this.isAuthenticated) {
      this.name = this.authService.getUserInfo()
      console.log('Выполнен вход в систему')
    }
  }

  ngOnInit(): void {
    this.checkAuthenticated()
    if(this.isAuthenticated) this.name = this.authService.getUserInfo()
  }
}
