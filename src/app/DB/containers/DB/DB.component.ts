
import {  ChangeDetectionStrategy,  Component,  EventEmitter,  Input,  OnDestroy,  Output,} from '@angular/core';
import {  FirstDataRenderedEvent,  GridApi,  GridReadyEvent,  RowClickedEvent,} from 'ag-grid-community';

import { Patient } from '@patients/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-DB',
  styleUrls: ['./DB.component.scss'],
  templateUrl: './DB.component.html',
})
export class DBComponent implements OnDestroy {
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
    { headerName: '疾病', field: 'disease', sortable: true, filter: true },
    { headerName: '入院时间', field: 'Admission time', sortable: true, filter: true },
    { headerName: '出院时间', field: 'Discharge time', sortable: true, filter: true },
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
  public resizeColumnsCallback = () => setTimeout(() => this.gridApi?.sizeColumnsToFit());

  public onGridReady(params: GridReadyEvent) {
    // save API reference for showing the loading overlay
    this.gridApi = params.api;

    // makes sure that the table always fits its container
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', this.resizeColumnsCallback);
  }

  public ngOnDestroy() {
    window.removeEventListener('resize', this.resizeColumnsCallback);
  }

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    // when the data is loaded/refreshed, resize the table again
    params.api.sizeColumnsToFit();
  }

  public onRowClicked(event: RowClickedEvent) {
    this.patientClick.emit(event.data as Patient);
  }

}
