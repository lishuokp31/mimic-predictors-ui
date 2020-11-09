import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Patient } from '@patients/models';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patients-table',
  styleUrls: ['./patients-table.component.scss'],
  templateUrl: './patients-table.component.html',
})
export class PatientsTableComponent {
  private gridApi?: GridApi;
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

  @Input()
  public set isLoading(value: boolean | null) {
    if (this.gridApi) {
      if (value) {
        this.gridApi.showLoadingOverlay();
      } else {
        this.gridApi.hideOverlay();
      }
    }
  }

  @Output()
  public patientClick = new EventEmitter<Patient>();

  public onGridReady(params: GridReadyEvent) {
    // save API reference for showing the loading overlay
    this.gridApi = params.api;

    // makes sure that the table always fits its container
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    // when the data is loaded/refreshed, resize the table again
    params.api.sizeColumnsToFit();
  }

  public onRowClicked(event: RowClickedEvent) {
    this.patientClick.emit(event.data as Patient);
  }
}
