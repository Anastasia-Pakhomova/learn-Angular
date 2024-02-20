import { Injectable } from '@angular/core';
import {SavedUserInfo, UserInfo} from 'src/app/interfaces/user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of, Subject, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000"
 private _isAuthenticated = new Subject<boolean>()

  public userName$: Subject<string> = new Subject<string>()

  constructor(private httpClient: HttpClient) { }

  public login(user: UserInfo): Observable<string> {
    return this.httpClient.post<SavedUserInfo>(`${this.baseUrl}/user`, user)
      .pipe(
      map((data: SavedUserInfo) => {
        const user = {
          id: data.id,
          token: data.token
        }
        localStorage.setItem('userInfo', JSON.stringify(user))
        this._isAuthenticated.next(true)
        return data.token
      }),
      switchMap((token) => this.getUserInfo(token)),
      tap(res => this.userName$.next(res))
    )
  }

  public logout(name: string, id: number) {
    console.log(`Выход ${name}`)
    return this.httpClient.delete(`${this.baseUrl}/user/${id}`).pipe(
      map(() => {
        localStorage.removeItem('userInfo')
        this._isAuthenticated.next(false)
      })
    )
  }

  public isAuthenticated () {
    return of(!!localStorage.getItem('userInfo'))
  }

  public getIsAuthenticated() {
    this._isAuthenticated.next(!!localStorage.getItem('userInfo'))
    return this._isAuthenticated
  }

  public getUserInfo (token: string): Observable<string> {
    return this.httpClient.get<SavedUserInfo[]>(`${this.baseUrl}/user`, {
      params: new HttpParams().set('token', token)
    }).pipe(
      map(data => data[0].login)
    )
  }
}
