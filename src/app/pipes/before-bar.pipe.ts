import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beforeBar',
  standalone: true
})
export class BeforeBarPipe implements PipeTransform {

  transform(value:string): string {
    if (!value) return value;
    const index = value.indexOf('/');
    return index !== -1 ? value.substring(0, index) : value;
  }

}
