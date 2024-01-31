import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, inject } from '@angular/core';

@Directive({
  selector: '[appCurrency]',
  standalone: true
})
export class CurrencyDirective implements  OnChanges {
  @Input('valor') 
  public valor!: number;
  private renderer:Renderer2 = inject(Renderer2);

  constructor(
    private elementRef: ElementRef<HTMLElement>) {
     }

  ngOnChanges(changes: SimpleChanges): void {
      this.atualizaCor();
  }

  private atualizaCor() {
    if(this.valor < 1){
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#DD4B4B')
    }
    else if (this.valor >= 1 && this.valor <= 5){
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#3C7649')
    }
    else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#3684CB')
    }
  }

}
