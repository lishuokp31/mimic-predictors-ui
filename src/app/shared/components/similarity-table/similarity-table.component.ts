import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Similarity } from '@shared/models';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
@Component({
  selector: 'app-similarity-table',
  styleUrls: ['./similarity-table.component.scss'],
  templateUrl: './similarity-table.component.html',
})
export class SimilarityTableComponent implements OnDestroy {
  private gridApi?: GridApi;
  public readonly columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
    },
    { headerName: '相似度',
    field: 'similarity',
    sortable: true,
    filter: true },
    {
      headerName: '病历编号',
      field: 'value',
      sortable: true,
      filter: true,
      suppressSizeToFit: true,
      // lockPosition: true,
    },
  ];

  @Input()
  public similarities: Similarity[] | null = [];

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
  public similarityClick = new EventEmitter<Similarity>();

  public resizeColumnsCallback = () =>
    setTimeout(() => this.gridApi?.sizeColumnsToFit());

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', this.resizeColumnsCallback);
  }

  public ngOnDestroy() {
    window.removeEventListener('resize', this.resizeColumnsCallback);
  }

  public onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  public onRowClicked(event: RowClickedEvent) {
    this.similarityClick.emit(event.data as Similarity);
  }
}
