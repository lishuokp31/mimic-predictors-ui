import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
// import { Observable } from 'rxjs';

// import { Ner } from '@ner/models';
// import * as actions from '@ner/store/actions';
// import { NerState } from '@ner/store';
// import { NewNerFormDialog } from '@ner/dialogs';
import { FeatureValueChangeEvent } from '@shared/components';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ner',
  styleUrls: ['./ner.component.scss'],
  templateUrl: './ner.component.html',
})
export class NerComponent {
  values = '';

  constructor(
    private store: Store
  ) {
  }

  public refresh() {
    this.values = '';
  }

  // public onChange(event: FeatureValueChangeEvent) {
  //   this.values = event.feature.label;
  // }
  // EvaluateInfo = {content : ''};

  public entity_recognition(){
    // TODO:执行实体识别
  }
}
