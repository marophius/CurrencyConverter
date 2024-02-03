import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from './services/currency.service';
import { Subscription, switchMap, tap, timer } from 'rxjs';
import { ICurrency } from './models/currency';
import { LoadingService } from './services/loading.service';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    CurrencyCardComponent,
    HttpClientModule,
  ],
  providers: [
    CurrencyService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'CurrencyConverter';
  private currencyService: CurrencyService = inject(CurrencyService);
  public currenciesSignal: WritableSignal<ICurrency[]> = signal<ICurrency[]>([]);
  private loadingService: LoadingService = inject(LoadingService);
  public subscription!: Subscription;
  private dataStorageService: DataStorageService = inject(DataStorageService);
  private _startDue: number = 0;
  private _cacheTime: number = 180000;

  constructor() {
    let currentDate = new Date();
    let arr = this.dataStorageService.checkStorage();
    if(arr) {
      let lastDate = new Date(arr[0].lastUpdate);
      this._startDue = (lastDate.getTime() + this._cacheTime) - currentDate.getTime();
      if(this._startDue >= this._cacheTime) 
        this._startDue = 0;
      else {
        this.currenciesSignal.set(arr);
      }
    }
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  public getCurrencies() {
    this.subscription = timer(this._startDue, this._cacheTime).pipe(
      tap(() => this.loadingService.setLoading(true)),
      switchMap(() => this.currencyService.getCurrencyData()),
      tap({
        next: (res: ICurrency[]) => {
          this.dataStorageService.clearData();
          this.currenciesSignal.set(res);
          this.dataStorageService.setData(res);
        },
        error: (error: Error) => console.log(error)
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
