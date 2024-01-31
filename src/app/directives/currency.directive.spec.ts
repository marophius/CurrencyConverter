import { TestBed } from '@angular/core/testing';
import { CurrencyDirective } from './currency.directive';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CurrencyDirective', () => {
  let fixture: ComponentFixture<CurrencyDirective>;
  let directive: CurrencyDirective;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDirective);
    directive = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should set color to red when valor is less than 1', () => {
    directive.valor = 0;
    fixture.detectChanges();

    expect(element.style.color).toBe('#DD4B4B');
  });

  it('should set color to green when valor is between 1 and 5', () => {
    directive.valor = 3;
    fixture.detectChanges();

    expect(element.style.color).toBe('#3C7649');
  });

  it('should set color to blue when valor is greater than 5', () => {
    directive.valor = 10;
    fixture.detectChanges();

    expect(element.style.color).toBe('#3684CB');
  });

  it('should update color when valor changes', () => {
    directive.valor = 2;
    fixture.detectChanges();
    expect(element.style.color).toBe('#3C7649');

    directive.valor = 8;
    fixture.detectChanges();
    expect(element.style.color).toBe('#3684CB');
  });
});