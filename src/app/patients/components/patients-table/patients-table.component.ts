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
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      lockPosition: true,
    },
    { headerName: '姓名', field: 'name', sortable: true, filter: true },
    { headerName: '性别', field: 'gender', sortable: true, filter: true },
    { headerName: '年龄', field: 'age', sortable: true, filter: true },
    { headerName: '民族', field: 'ethnicity', sortable: true, filter: true },
  ];

  @Input()
  public patients: Patient[] | null = [];

  public onGridReady(params: any) {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
}
