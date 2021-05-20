import { Component, OnInit, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

import { Ner } from '@ner/models';
import * as actions from '@ner/store/actions';
import { NerState } from '@ner/store';
import { ImportNerByTXTPayload, ImportNerByFilePayload } from '@ner/models';
import { Userinfo } from '@login/models';
import { LoginState} from '../../../store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss'],
})
export class NerComponent implements OnInit {
  userinfo: Userinfo = {
    login: false,
    username: '',
    email: '',
    phone: '',
    level: -1,
  };
  public login$: Observable<boolean>;
  public username$: Observable<string>;
  public email$: Observable<string>;
  public phone$: Observable<string>;
  public level$: Observable<number>;

  // 文本输入框中输入的文本以及文件中的文本
  inputValue: string = '';
  file_inputValue: Array<string> = new Array<string>();
  // 不采用绑定事件监听，而是使用可观察对象来执行事件
  public sequence$: Observable<string>;
  public entities$: Observable<string[][]>;
  public file_sequence$: Observable<string[]>;
  public file_entities$: Observable<string[][][]>;
  public isLoading$: Observable<boolean>;

  // 权限信息
  public isVisible_level_modal : boolean = false;

  file: NzUploadFile = {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  };
  fileList: NzUploadFile[] = [];
  string: string = '';

  constructor(private msg: NzMessageService, private store: Store,private router: Router) {
    var tmp = setInterval(() => {
      if(!this.userinfo.login){
        this.router.navigate(['/login'])
      }
    } , 20)
    this.login$ = this.store.select(LoginState.login);
    this.username$ = this.store.select(LoginState.username);
    this.email$ = this.store.select(LoginState.email);
    this.phone$ = this.store.select(LoginState.phone);
    this.level$ = this.store.select(LoginState.level);

    this.sequence$ = this.store.select(NerState.sequence);
    this.entities$ = this.store.select(NerState.entities);
    this.file_sequence$ = this.store.select(NerState.file_sequence);
    this.file_entities$ = this.store.select(NerState.file_entities);
    this.isLoading$ = this.store.select(NerState.isLoading);
  }

  ngOnInit(): void {
    this.login$.subscribe((value) => {
      this.userinfo.login = value;
    });
    this.username$.subscribe((value) => {
      this.userinfo.username = value;
    });
    this.email$.subscribe((value) => {
      this.userinfo.email = value;
    });
    this.phone$.subscribe((value) => {
      this.userinfo.phone = value;
    });
    this.level$.subscribe((value) => {
      this.userinfo.level = value;
    });

    if(this.userinfo.level > 2){
      console.log("权限不足！" + this.userinfo.level)
      this.isVisible_level_modal = true;
    }
  }

  public importByTXT() {
    console.log(this.inputValue);
    const outData: ImportNerByTXTPayload = {
      sequence: this.inputValue,
    };
    const action = new actions.ImportNerByTXTAction(outData);
    this.store.dispatch(action);
    console.log('entities:' + this.entities$.toPromise());
  }

  public importByFile() {
    // console.log('this.fileList.length:' + this.fileList.length);
    // this.file_inputValue = new Array<string>();
    // for (var i = 0; i < this.fileList.length; i++) {
    //   console.log(this.fileList[i].originFileObj?.name);
    //   this.readFromFile(this.fileList[i].originFileObj as File);
    //   this.file_inputValue.push(this.string);
    //   console.log('this.string:' + this.string);
    // }


    // const outData: ImportNerByFilePayload = {
    //   file_sequence: this.file_inputValue,
    // };
    // const action = new actions.ImportNerByFileAction(outData);
    // this.store.dispatch(action);
    // console.log('file_entities:' + this.file_entities$.toPromise());


    // console.log(this.inputValue);
    const outData: ImportNerByTXTPayload = {
      sequence: this.file_inputValue[0],
    };
    const action = new actions.ImportNerByTXTAction(outData);
    this.store.dispatch(action);
    console.log('entities:' + this.entities$.toPromise());

  }

  readFromFile(file: File) {
    var reader = new FileReader();
    // this.string = "";
    reader.onload = (e) => {
      // console.log('result3:' + info.target.result);
      console.log('reader.result:' + reader.result);
      this.string = reader.result as string;

      // this.file_inputValue.push(reader.result as string);
    };
    reader.readAsText(file);
  }

  public showfile_inputValue() {
    for (var i = 0; i < this.file_inputValue.length; i++) {
      console.log('file_inputValue' + i + ':' + this.file_inputValue[i]);
    }
  }

  clearString() {
    this.inputValue = '';
  }

  handleChange(info: NzUploadChangeParam): void {
    this.file = info.file;
    this.fileList = [...info.fileList];
    this.file_inputValue = new Array<string>();
    const status = this.file.status;
    if (status !== 'uploading') {
      console.log(this.file, this.fileList);
    }
    if (status === 'done') {
      this.msg.success(`${this.file.name} 文件上传成功.`);
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log('reader.result:' + reader.result);
        this.file_inputValue.push(reader.result as string);
      };
      reader.readAsText(info.file.originFileObj as any);
    } else if (status === 'error') {
      this.msg.error(`${this.file.name} 文件上传失败.`);
    }
    // for (var i = 0; i < this.file_inputValue.length; i++) {
    //   console.log('file_inputValue' + i + ":" + this.file_inputValue[i]);
    // }
  }

  handleCancel_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  handleOk_level_modal(){
    this.isVisible_level_modal = false;
    this.router.navigate(['/user']);
  }

  public onNerClicked(event: Ner) {
    // const { Tnumber } = event;
    // this.router.navigate(['/patients', id]);
  }
}
