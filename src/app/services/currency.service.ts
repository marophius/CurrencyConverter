import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ICurrency } from '../models/currency';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly baseUrl: string = 'https://economia.awesomeapi.com.br/last/'
  private loading: LoadingService = inject(LoadingService);

  constructor(
    private http: HttpClient) { }

  public getCurrencyData(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(this.baseUrl + 'CAD-BRL,ARS-BRL,GBP-BRL').pipe(
      map((res:any) => {
        const array = Object.keys(res).map(chave => ({
          key: chave,
          ...res[chave]
        }))

        let currencyArr:ICurrency[] = array.map(e => {
          let curr:ICurrency = {
            name: String(e.name),
            bid: Number(e.bid),
            varBid: Number(e.varBid),
            lastUpdate: new Date()
          }
          return curr
        })

        return currencyArr;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      tap(() => {
        this.loading.setLoading(false)
      })
    )
  }


}
