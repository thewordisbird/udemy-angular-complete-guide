import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string, ): string {
    let reversedString = '';
    for (let i=value.length-1; i>-1; i--){
      reversedString = reversedString + value.slice(i,i+1)
    }
    return reversedString;
  }

}
