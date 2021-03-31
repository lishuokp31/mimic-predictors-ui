import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

interface entities {
  Tnumber: string;
  kind: string;
  start_index: number;
  end_index: number;
  actual_value: string;
}

@Component({
  selector: 'app-ner',
  templateUrl: './ner.component.html',
  styleUrls: ['./ner.component.scss'],
})
export class NerComponent implements OnInit {
  inputValue?: string;

  constructor(private msg: NzMessageService) {}

  clearString(){
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

  searchValue = '';
  visible = false;
  listOfData: entities[] = [
    {
      Tnumber: 'T1',
      kind: 'DRUG_DOSAGE',
      start_index: 447,
      end_index: 450,
      actual_value: '小蜜丸',
    },
    {
      Tnumber: 'T2',
      kind: 'DRUG_TASTE',
      start_index: 451,
      end_index: 453,
      actual_value: '味甜',
    },
    {
      Tnumber: 'T3',
      kind: 'DRUG_TASTE',
      start_index: 454,
      end_index: 456,
      actual_value: '微苦',
    },
    {
      Tnumber: 'T4',
      kind: 'DRUG_EFFICACY',
      start_index: 1,
      end_index: 5,
      actual_value: '补气养血',
    },
    {
      Tnumber: 'T5',
      kind: 'SYMPTOM',
      start_index: 13,
      end_index: 17,
      actual_value: '月经不调',
    },
    {
      Tnumber: 'T6',
      kind: 'SYMPTOM',
      start_index: 18,
      end_index: 22,
      actual_value: '经期腹痛',
    },
    {
      Tnumber: 'T7',
      kind: 'PERSON_GROUP',
      start_index: 433,
      end_index: 435,
      actual_value: '孕妇',
    },
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: entities) => item.Tnumber.indexOf(this.searchValue) !== -1
    );
  }
}
