import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-data-operations',
  styleUrls: ['./data-operations.component.scss'],
  templateUrl: './data-operations.component.html',
})
export class DataOperationsComponent {
  @Input() isLoading: boolean | null = false;
  @Input() disableInfer: boolean | null = false;
  @Output() loadSample = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() predict = new EventEmitter<void>();

  public onLoadSample() {
    this.loadSample.emit();
  }

  public onReset() {
    this.reset.emit();
  }

  public onPredict() {
    this.predict.emit();
  }
}
