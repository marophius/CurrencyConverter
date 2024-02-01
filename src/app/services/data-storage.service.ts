import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ICurrency } from '../models/currency';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private localStorage: StorageService = inject(LOCAL_STORAGE);

  constructor() { }

  public checkStorage() {
    const data =  this.localStorage.get('data') as ICurrency[];

    if(!data)
      return null;

    return data;
  }

  public async setData(currencies: ICurrency[]): Promise<boolean> {
    try {
      this.localStorage.set('data', currencies)
      return true;
    }catch(error) {
      return false;
    }
  }

  public async clearData() {
    this.localStorage.remove('data');
  }
  
}
