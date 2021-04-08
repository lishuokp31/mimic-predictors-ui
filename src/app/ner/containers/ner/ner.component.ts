import { Component, OnInit, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

import { Ner } from '@ner/models';
import * as actions from '@ner/store/actions';
import { NerState } from '@ner/store';
import { ImportNerByTXTPayload } from '@ner/models';
@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss'],
})
export class NerComponent implements OnInit {
  // 文本输入框中输入的文本
  inputValue: string = '';
  // 不采用绑定事件监听，而是使用可观察对象来执行事件
  public sequence$: Observable<string>;
  public entities$: Observable<string[][]>;
  public isLoading$: Observable<boolean>;
  // 文件上传框中选择上传的文件
  public currentSelectedFilename: string | null = null;
  public currentSelectedFile: File | null = null;

  constructor(private msg: NzMessageService, private store: Store) {
    // 从应用程序状态返回一段数据，并将其包装成一个可观察的对象
    this.sequence$ = this.store.select(NerState.sequence);
    this.entities$ = this.store.select(NerState.entities);
    this.isLoading$ = this.store.select(NerState.isLoading);
  }

  public importByTXT() {
    console.log(this.inputValue)
    this.currentSelectedFile = null;
    this.currentSelectedFilename = null;
    const outData: ImportNerByTXTPayload = {
      sequence: this.inputValue,
    };
    const action = new actions.ImportNerByTXTAction(outData);
    this.store.dispatch(action);
    console.log("entities:" + this.entities$.toPromise());
    // this.entitiesdata = this.store.select(NerState.ner);
  }

  public importByFile() {
    // TODO:
  }

  clearString() {
    this.inputValue = '';
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} 文件上传成功.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} 文件上传失败.`);
    }
  }

  ngOnInit(): void {}

  public onNerClicked(event: Ner) {
    // const { Tnumber } = event;
    // this.router.navigate(['/patients', id]);
  }
}
