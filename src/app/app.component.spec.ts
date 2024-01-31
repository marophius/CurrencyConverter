import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject, of } from 'rxjs';
import { CurrencyService } from './services/currency.service';
import { LoadingService } from './services/loading.service';
import { ICurrency } from './models/currency';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    const currencyServiceSpyObj = jasmine.createSpyObj('CurrencyService', ['getCurrencyData']);
    const loadingServiceSpyObj = jasmine.createSpyObj('LoadingService', ['setLoading']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: CurrencyService, useValue: currencyServiceSpyObj },
        { provide: LoadingService, useValue: loadingServiceSpyObj }
      ]
    }).compileComponents();

    currencyServiceSpy = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCurrencyData on ngOnInit', () => {
    currencyServiceSpy.getCurrencyData.and.returnValue(of([]));
    component.ngOnInit();
    expect(currencyServiceSpy.getCurrencyData).toHaveBeenCalled();
  });

  it('should set loading to true when getCurrencies is called', () => {
    currencyServiceSpy.getCurrencyData.and.returnValue(of([]));
    component.getCurrencies();
    expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(true);
  });

  it('should unsubscribe from subscription on ngOnDestroy', () => {
    component.subscription = { unsubscribe: jasmine.createSpy('unsubscribe') } as any;
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should set currenciesSignal with data from currency service', () => {
    const mockData: ICurrency[] = [{ name: 'USD', bid: 5.0, varBid: 0.1, lastUpdate: new Date() }];
    currencyServiceSpy.getCurrencyData.and.returnValue(of(mockData));
    component.getCurrencies();
    expect(component.currenciesSignal.asReadonly()).toEqual(mockData);
  });
});
