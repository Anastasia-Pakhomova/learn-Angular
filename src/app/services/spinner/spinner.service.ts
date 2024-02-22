import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _loading = false;

  constructor() {}

  setLoading(loading: boolean) {
    this._loading = loading;
  }

  getLoading(): boolean {
    return this._loading;
  }
}
