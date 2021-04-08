import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Ner } from '@ner/models';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ner-table',
  styleUrls: ['./ner-table.component.scss'],
  templateUrl: './ner-table.component.html',
})
export class NerTableComponent implements OnDestroy {
  private gridApi?: GridApi;
  public readonly columnDefs = [
    // {
    //   headerName: 'Tnumber',
    //   field: 'Tnumber',
    //   sortable: true,
    //   filter: true,
    //   suppressSizeToFit: true,
    //   lockPosition: true,
    // },
    {
      headerName: 'kind',
      field: 'kind',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'start_index',
      field: 'start_index',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'end_index',
      field: 'end_index',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'actual_value',
      field: 'actual_value',
      sortable: true,
      filter: true,
    },
  ];

  public labels : string[] = ['kind' , 'start_index' , 'end_index' , 'actual_value'];

  @Input()
  public entities: string[][] | null = [];

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

  public resizeColumnsCallback = () => setTimeout(() => this.gridApi?.sizeColumnsToFit());

  public ngOnDestroy() {
    window.removeEventListener('resize', this.resizeColumnsCallback);
  }

  public onRowClicked(event: RowClickedEvent) {
    // TODO:
  }

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    // when the data is loaded/refreshed, resize the table again
    params.api.sizeColumnsToFit();
  }

  public onGridReady(params: GridReadyEvent) {
    // save API reference for showing the loading overlay
    this.gridApi = params.api;

    // makes sure that the table always fits its container
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', this.resizeColumnsCallback);
  }

}
