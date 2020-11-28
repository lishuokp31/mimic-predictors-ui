import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tooltipfy' })
export class TooltipfyPipe implements PipeTransform {
  public transform(value: number | null): string {
    // null feature values should not have tooltips
    if (value === null) return '';

    // non-null feature values are rendered as-is
    return value.toString();
  }
}
