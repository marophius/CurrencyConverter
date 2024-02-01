import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from './services/currency.service';
import { Subscription, switchMap, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
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


  constructor() {
    
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  public getCurrencies() {
    this.loadingService.setLoading(true);
    this.subscription = timer(0, 180000).pipe(
      switchMap(() => this.currencyService.getCurrencyData()),
      tap({
        next: (res: ICurrency[]) => {
          const currentTime = new Date();
          const cacheTime = 180000
          const cachedData = this.dataStorageService.checkStorage() as ICurrency[];
          if(!this.isCacheValid(cachedData, currentTime, cacheTime)){
            this.dataStorageService.clearData();
            this.currenciesSignal.set(res);
            this.dataStorageService.setData(res);
          }else {
            this.currenciesSignal.set(cachedData);
          }
        },
        error: (error: Error) => console.log(error)
      })
    ).subscribe();
  }

  private isCacheValid(data: ICurrency[], currentTime: Date, cacheTime: number) {
    if (!data || data.length === 0) {
      return false;
    }
  
    const lastUpdatedTime = new Date(data[0].lastUpdate);
    const wastedTime = currentTime.getTime() - lastUpdatedTime.getTime()
    return  wastedTime <= cacheTime;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.dataStorageService.clearData();
  }
}
