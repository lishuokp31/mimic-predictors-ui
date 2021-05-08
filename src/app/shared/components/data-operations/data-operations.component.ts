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
  public objectid: string = '5fd894edee91c60c2c324feb';

  @Input() isLoading: boolean | null = false;
  @Input() disableInfer: boolean | null = false;
  @Output() loadSample = new EventEmitter<void>();
  @Output() loadSpecifiedSample = new EventEmitter<string>();
  @Output() thresholdWarning = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() predict = new EventEmitter<void>();

  public onLoadSample() {
    this.loadSample.emit();
    this.objectid = "";
  }

  public onLoadSpecifiedSample(objectid: string){
    this.loadSpecifiedSample.emit(objectid);
  }

  public onThresholdWarning(){
    this.thresholdWarning.emit();
  }

  public onReset() {
    this.reset.emit();
  }

  public onPredict() {
    this.predict.emit();
  }
}
