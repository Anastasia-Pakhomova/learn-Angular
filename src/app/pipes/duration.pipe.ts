import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(courseDuration: number): string {
    if(courseDuration<=59) return `${courseDuration} минут`
    const hours = Math.floor(courseDuration/60)
    const minutes = Math.round(((courseDuration/60) - Math.floor(courseDuration/60))*60)
    function getNoun(number: number) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return 'часов';
      }
      n %= 10;
      if (n === 1) {
        return 'час';
      }
      if (n >= 2 && n <= 4) {
        return 'часа';
      }
      return 'часов';
    }
    return `${hours} ${getNoun(hours)} ${minutes===0 ? "00" : minutes} минут`
  }

}
