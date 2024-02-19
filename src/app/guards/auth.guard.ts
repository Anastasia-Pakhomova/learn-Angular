import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import {map, Observable} from "rxjs";

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsAuthenticated()
    .pipe(
    map(response => {
      if(!response) {
        router.parseUrl('/login')
        return false
      }
      return true
    })
  )

  // if (authService.getIsAuthenticated()) {
  //   return true;
  // }
  //
  // return router.parseUrl('/login');
};
