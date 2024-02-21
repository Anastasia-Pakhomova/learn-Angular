import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {first, mergeMap, Observable} from 'rxjs';
import {AuthService} from "../services/authentication/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.authService.token$
      .pipe(
        first(),
        mergeMap((token) => {
          if(token) return next.handle(request.clone({setHeaders: {Authorization: token}}))
          return next.handle(request)
          }
        )
      )
  }
}
