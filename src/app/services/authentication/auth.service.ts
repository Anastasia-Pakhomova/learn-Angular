import { Injectable } from '@angular/core';
import {SavedUserInfo, UserInfo} from 'src/app/interfaces/user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, switchMap, tap} from "rxjs";
import {environment} from "src/environments/environment.development"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl
  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public userName$: Subject<string> = new Subject<string>()
  public token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

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
        this._isAuthenticated$.next(true)
        this.token$.next(data.token)
        return data.token
      }),
      // switchMap(token => this.getUserInfo(token)),
      // tap(res => this.userName$.next(res))
    )
  }

  public logout(name: string, id: number) {
    console.log(`Выход ${name}`)
    this._isAuthenticated$.next(false)
    this.token$.next(null)
    return this.httpClient.delete(`${this.baseUrl}/user/${id}`).pipe(
      tap(() => {
        localStorage.removeItem('userInfo')
      })
    )
  }

  get getIsAuthenticated(): Observable<boolean>  {
    return this._isAuthenticated$.asObservable()
  }

  public getUserInfo (token: string): Observable<string> {
    return this.httpClient.get<SavedUserInfo[]>(`${this.baseUrl}/user`, {
      params: new HttpParams().set('token', token)
    }).pipe(
      map(data => data[0].login)
    )
  }

}
