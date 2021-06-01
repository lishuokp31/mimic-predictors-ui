import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { curveMonotoneX } from 'd3-shape';
import { NzContentComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-threshold',
  styleUrls: ['./threshold.component.scss'],
  templateUrl: './threshold.component.html',
})
export class ThresholdComponent {
  public readonly yAxisTicks = [
    0,
    25,
    50,
    75,
    100,
    125,
    150,
    175,
    200,
    225,
    250,
    275,
    300,
  ];
  public readonly colorScheme_list = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  public readonly referenceLines = [{ name: '超过阈值', value: 1.3 }];
  // public readonly curve = curveMonotoneX;

  @Input()
  public label: string = '';

  @Input()
  public showResults: boolean | null = false;

  @Input()
  public title: string = '';

  @Input()
  public data: any[] = [];

  @Input()
  public singal: boolean | null = false;

  @Input()
  public index: number = 0;

  public colorScheme = this.singal ? {domain: [this.colorScheme_list.domain[this.index % 6]]} : this.colorScheme_list;

  public data2: any[] = [
    {
      name: '肌酸酐',
      series: [
        {
          name: 'day1',
          value: 100,
        },
        {
          name: 'day2',
          value: 150,
        },
        {
          name: 'day3',
          value: 170,
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.colorScheme = this.singal ? {domain: [this.colorScheme_list.domain[this.index % 6]]} : this.colorScheme_list;
  }

  // @Input() set probabilities(value: number[] | null) {
  //   if(value) {
  //     this.data = [{
  //       name : this.label,
  //       series: value.map((x, i) => ({ name: (i + 1).toString(), value: x })),
  //     }]
  //   }
  // }
}
