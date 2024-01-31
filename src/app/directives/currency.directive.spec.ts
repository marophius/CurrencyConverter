import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { CurrencyDirective } from './currency.directive';
import { CurrencyCardComponent } from '../components/currency-card/currency-card.component';
import { By } from '@angular/platform-browser';

describe('CurrencyDirective', () => {
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;
  let directiveElement: DebugElement;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    const rendererSpyObj = jasmine.createSpyObj('Renderer2', ['setStyle']);
    const elementRefSpyObj = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      imports: [CurrencyDirective, CurrencyCardComponent],
      providers: [
        { provide: Renderer2, useValue: rendererSpyObj },
        { provide: ElementRef, useValue: elementRefSpyObj },
        { provide: ComponentFixtureAutoDetect, useValue: true } // Para detecção automática das mudanças no componente
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyCardComponent);
    component = fixture.componentInstance;
    component.currency = {
      name: 'Qualquer',
      bid: 1,
      varBid: 0.1,
      lastUpdate: new Date()
    }
    fixture.detectChanges();
    directiveElement = fixture.debugElement.query(By.directive(CurrencyDirective));
    rendererSpy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
    elementRefSpy = TestBed.inject(ElementRef) as jasmine.SpyObj<ElementRef>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set color to red when valor is less than 1', () => {
    component.currency = {
      name: 'Qualquer',
      bid: 0.5,
      varBid: 0.1,
      lastUpdate: new Date()
    }
    fixture.detectChanges();
    expect(rendererSpy.setStyle).toHaveBeenCalledWith(elementRefSpy.nativeElement, 'color', '#DD4B4B');
  });

  it('should set color to green when valor is between 1 and 5', () => {
    component.currency = {
      name: 'Qualquer',
      bid: 3,
      varBid: 0.1,
      lastUpdate: new Date()
    }
    fixture.detectChanges();
    expect(rendererSpy.setStyle).toHaveBeenCalledWith(elementRefSpy.nativeElement, 'color', '#3C7649');
  });

  it('should set color to blue when valor is greater than 5', () => {
    component.currency = {
      name: 'Qualquer',
      bid: 10,
      varBid: 0.1,
      lastUpdate: new Date()
    }
    fixture.detectChanges();
    expect(rendererSpy.setStyle).toHaveBeenCalledWith(elementRefSpy.nativeElement, 'color', '#3684CB');
  });
});