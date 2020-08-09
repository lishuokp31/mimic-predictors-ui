import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent {}
