import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Favorite } from '@user/models';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-favtable',
  styleUrls: ['./user-favtable.component.scss'],
  templateUrl: './user-favtable.component.html',
})
export class UserFavtableComponent implements OnDestroy {
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
    { headerName: '类型', field: 'fav_type', sortable: true, filter: true },
    { headerName: '备注', field: 'remark', sortable: true, filter: true },
    { headerName: '值', field: 'value', sortable: true, filter: true },
  ];

  @Input()
  public favorites: Favorite[] | null = [];

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
  public favoriteClick = new EventEmitter<Favorite>();

  public resizeColumnsCallback = () => setTimeout(() => this.gridApi?.sizeColumnsToFit());

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
    this.favoriteClick.emit(event.data as Favorite);
  }
}
