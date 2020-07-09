import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-data-operations',
  styleUrls: ['./data-operations.component.scss'],
  templateUrl: './data-operations.component.html',
})
export class DataOperationsComponent {}
