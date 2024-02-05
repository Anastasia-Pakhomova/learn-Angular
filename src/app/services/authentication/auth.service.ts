import { Injectable } from '@angular/core';
import {SavedUserInfo, UserInfo} from 'src/app/interfaces/user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  public login(user: UserInfo): Observable<SavedUserInfo> {
    return this.httpClient.post<SavedUserInfo>(`${this.baseUrl}/user`, user)
  }

  public logout(name: string, id: number) {
    console.log(`Выход ${name}`)
    localStorage.removeItem('userInfo')
    return this.httpClient.delete(`${this.baseUrl}/user/${id}`)
  }

  public isAuthenticated () {
    return !!localStorage.getItem('userInfo');
  }

  public getUserInfo (token: string): Observable<SavedUserInfo[]> {
    return this.httpClient.get<SavedUserInfo[]>(`${this.baseUrl}/user`, {
      params: new HttpParams().set('token', token)
    });
  }
}
