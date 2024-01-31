import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loading as true', (done: DoneFn) => {
    service.isLoading.subscribe((isLoading: boolean) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should set loading to false', (done: DoneFn) => {
    service.setLoading(false);
    service.isLoading.subscribe((isLoading: boolean) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should set loading to true', (done: DoneFn) => {
    service.setLoading(false);
    service.setLoading(true);
    service.isLoading.subscribe((isLoading: boolean) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });
});