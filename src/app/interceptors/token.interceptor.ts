import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/authentication/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let isUserAuthenticated: boolean
      this.authService.isAuthenticated().subscribe((response: any)=> {
        isUserAuthenticated=response
        if (isUserAuthenticated) {
          const user = localStorage.getItem('userInfo')
          const userInfo = user !== null ?  JSON.parse(user) : ''
          const token = userInfo.token
          if(token.length > 0) request = request.clone({setHeaders: { Authorization: token }});
        }
      })

    return next.handle(request);
  }
}
