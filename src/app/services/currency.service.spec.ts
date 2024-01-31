import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyService } from './currency.service';
import { LoadingService } from './loading.service';
import { of } from 'rxjs';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CurrencyService,
        { provide: LoadingService, useValue: loadingSpy }
      ]
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API and return currency data', (done: DoneFn) => {
    const mockResponse = {
      "CADBRL": {
        "code": "CAD",
        "codein": "BRL",
        "name": "Dólar Canadense/Real Brasileiro",
        "high": "3.6959",
        "low": "3.691",
        "varBid": "0.0048",
        "pctChange": "0.13",
        "bid": "3.6787",
        "ask": "3.7131",
        "timestamp": "1706677299",
        "create_date": "2024-01-31 02:01:39"
    },
    "ARSBRL": {
        "code": "ARS",
        "codein": "BRL",
        "name": "Peso Argentino/Real Brasileiro",
        "high": "0.006",
        "low": "0.006",
        "varBid": "0",
        "pctChange": "0",
        "bid": "0.006",
        "ask": "0.006",
        "timestamp": "1706677234",
        "create_date": "2024-01-31 02:00:34"
    },
    "GBPBRL": {
        "code": "GBP",
        "codein": "BRL",
        "name": "Libra Esterlina/Real Brasileiro",
        "high": "6.2893",
        "low": "6.2735",
        "varBid": "-0.011",
        "pctChange": "-0.17",
        "bid": "6.2696",
        "ask": "6.2854",
        "timestamp": "1706677244",
        "create_date": "2024-01-31 02:00:44"
    }
    };

    service.getCurrencyData().subscribe(data => {
      expect(data.length).toBe(Object.keys(mockResponse).length);

      // Check if the LoadingService setLoading method was called
      expect(loadingServiceSpy.setLoading).toHaveBeenCalledWith(false);
      
      done();
    });

    const req = httpMock.expectOne('https://economia.awesomeapi.com.br/last/CAD-BRL,ARS-BRL,GBP-BRL');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});