import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading: Observable<boolean> = this._isLoading.asObservable();
  
  constructor() { }

  setLoading(bool: boolean) {
    this._isLoading.next(bool);
  }
}
