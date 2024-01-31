import { AfterViewInit, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ICurrency } from '../../models/currency';
import { CurrencyDirective } from '../../directives/currency.directive';
import { CommonModule } from '@angular/common';
import { BeforeBarPipe } from '../../pipes/before-bar.pipe';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [
    CurrencyDirective,
    CommonModule,
    BeforeBarPipe
  ],
  providers: [
    BeforeBarPipe
  ],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss'
})
export class CurrencyCardComponent  {

  @Input()
  public currency!: ICurrency;
  public loadingService:LoadingService = inject(LoadingService);
  public isLoading: Observable<boolean> = this.loadingService.isLoading;
  @Output('reload')
  public reload: EventEmitter<number> = new EventEmitter<number>();

}
