import { Component, ChangeDetectionStrategy } from '@angular/core';
import { sepsisFeatures, sepsisFeatureCount } from '../../data';

@Component({
  selector: 'app-sepsis',
  templateUrl: './sepsis.component.html',
  styleUrls: ['./sepsis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepsisPage {
  public readonly features = sepsisFeatures;
  public readonly featureCount = sepsisFeatureCount;
  public probabilities = Array(14)
    .fill(0)
    .map((_) => Math.random());
}
