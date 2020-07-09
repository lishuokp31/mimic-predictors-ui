import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-model-results',
  styleUrls: ['./model-results.component.scss'],
  templateUrl: './model-results.component.html',
})
export class ModelResultsComponent {}
