import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/authentication/auth.service';
import {map, Observable} from "rxjs";

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    .pipe(
    map(response => {
      if(!response) {
        router.navigateByUrl('/login')
        return false
      }
      return true
    })
  )
};
