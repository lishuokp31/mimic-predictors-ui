import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Ethnicity, Gender } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-summary',
  styleUrls: ['./patient-summary.component.scss'],
  templateUrl: './patient-summary.component.html',
})
export class PatientSummaryComponent {
  @Input()
  public name: string = '患者姓名';

  @Input()
  public age: number = 70;

  @Input()
  public gender: Gender = '男';

  @Input()
  public ethnicity: Ethnicity = '汉族';
}
