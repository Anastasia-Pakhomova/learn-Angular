import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import {provideHttpClient} from "@angular/common/http";

describe('TokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenInterceptor,
      provideHttpClient()
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
