import { Injectable } from '@angular/core';
import {SavedUserInfo, UserInfo} from 'src/app/interfaces/user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000"
  //private isAuthenticated: Subject<boolean> = new Subject<boolean>();
  private _isAuthenticated = new Observable((subscriber) => {
    subscriber.next(!!localStorage.getItem('userInfo'));})

  constructor(private httpClient: HttpClient) { }

  public login(user: UserInfo): Observable<SavedUserInfo> {
    //this._isAuthenticated.next(true)
    return this.httpClient.post<SavedUserInfo>(`${this.baseUrl}/user`, user)
      .pipe(
      map((data: SavedUserInfo) => {
        const user = {
          id: data.id,
          token: data.token
        }
        localStorage.setItem('userInfo', JSON.stringify(user))
        return data
      })
    )
  }

  public logout(name: string, id: number) {
    console.log(`Выход ${name}`)
    localStorage.removeItem('userInfo')
    //this.isAuthenticated.next(false)
    return this.httpClient.delete(`${this.baseUrl}/user/${id}`)
  }

  public isAuthenticated () {
    return !!localStorage.getItem('userInfo');
  }

  public getIsAuthenticated() {
    return this._isAuthenticated
  }

  public hotDate() {
    const value = !!localStorage.getItem('userInfo');
    return new Observable((subscriber) => {
      subscriber.next(value);
    });
  }

  public getUserInfo (token: string): Observable<SavedUserInfo> {
    return this.httpClient.get<SavedUserInfo[]>(`${this.baseUrl}/user`, {
      params: new HttpParams().set('token', token)
    }).pipe(
      map(data => data[0]),
      take(1)
    )
  }

  // public getIsAuthenticated () {
  //   this.isAuthenticated.next(!!localStorage.getItem('userInfo'))
  //   return this.isAuthenticated.asObservable();
  // }
}
