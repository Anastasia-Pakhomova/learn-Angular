import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(user: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  public logout(name: string) {
    console.log(`Выход ${name}`)
    localStorage.removeItem('userInfo')
  }

  public isAuthenticated () {
    return !!localStorage.getItem('userInfo');
  }

  public getUserInfo () {
    const userString = localStorage.getItem('userInfo')
    if(userString !== null) {
      const user: UserInfo = JSON.parse(userString)
      return user.login
    }
    return ''
  }
}
