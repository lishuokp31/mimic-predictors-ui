import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Patient } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patients-table',
  styleUrls: ['./patients-table.component.scss'],
  templateUrl: './patients-table.component.html',
})
export class PatientsTableComponent {
  public readonly columnDefs = [
    { field: 'id' },
    { field: 'name' },
    { field: 'ethnicity' },
  ];

  @Input()
  public patients: Patient[] | null = [];
}
