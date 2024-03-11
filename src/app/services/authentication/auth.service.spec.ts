import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {autoSpy, SpyOf} from "../../utils/auto-spy";
import {HttpClient} from "@angular/common/http";
import {CoursesService} from "../courses/courses.service";

function setup<T>(): { default: () => any; build: () => T; httpClient: SpyOf<HttpClient>, [key: string]: any } {
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);
  const builder = {
    httpClient,
    default(): any {
      return builder;
    },
    build(): any {
      return new AuthService(httpClient);
    }
  };
  return builder;
}

describe('AuthService', () => {
  let service: AuthService;
  const { build, httpClient } = setup<AuthService>();

  beforeEach(() => {
    service = build();
  });

  afterEach(() => {
    httpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
