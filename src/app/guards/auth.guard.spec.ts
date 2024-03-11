import {TestBed, waitForAsync} from '@angular/core/testing';

import { authGuard } from './auth.guard';
import {AuthService} from "../services/authentication/auth.service";
import {Router} from "@angular/router";
import {delay, lastValueFrom, of} from "rxjs";

describe('AuthGuard', () => {
  let guard: typeof authGuard;
  const router = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  const fakeAuthService = jasmine.createSpyObj(["getIsAuthenticated"]);

  it('should be defined', () => {
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        {provide: Router, useValue: router},
        {provide: AuthService, useValue: fakeAuthService}
      ]
    })
    guard = TestBed.runInInjectionContext(() => authGuard);
    expect(guard).toBeDefined()
  });

  it("be able to hit route when user is logged in", waitForAsync(async() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: AuthService, useValue: {getIsAuthenticated: of(true).pipe(delay(1))}}
      ]
    })

    await TestBed.runInInjectionContext(async() => {
      const result = await lastValueFrom(authGuard())
      expect(result).toBe(true)
    })
  }))

  it("not be able to hit route when user is not logged in", waitForAsync(async() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: AuthService, useValue: {getIsAuthenticated: of(false).pipe(delay(1))}}
      ]
    })

    await TestBed.runInInjectionContext(async() => {
      const result = await lastValueFrom(authGuard())
      expect(result).toBe(false)
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login')
    })
  }))

});
