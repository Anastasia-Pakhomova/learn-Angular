import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import {map, Observable, tap} from "rxjs";

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsAuthenticated
    .pipe(
    map((response: boolean) => {
      if(!response) {
        router.navigateByUrl('/login')
        return false
      }
      return true
    })
  )
};
