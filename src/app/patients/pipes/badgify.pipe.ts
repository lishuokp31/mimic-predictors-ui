import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'badgify' })
export class BadgifyPipe implements PipeTransform {
  public transform(value: number): string | null {
    // badges are not displayed if empty
    if (value < 1) return null;

    // exact values are displayed if below 10
    if (value < 10) return value.toString();

    // 9+ is displayed for items greater than 9
    return '9+';
  }
}
