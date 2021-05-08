import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ImportNerByTXTPayload,
  ImportNerByFilePayload,
  Ner,
} from '@ner/models';

import { environment } from 'src/environments/environment';
@Injectable()
export class NerApiService {
  constructor(private http: HttpClient) {}

  // public loadAll(): Observable<Ner[]> {
  //   const url = `${environment.apiUrl}/ner`;
  //   return this.http.get<Ner[]>(url);
  // }

  // public getById(id: string): Observable<Ner> {
  //   const url = `${environment.apiUrl}/ner/${id}`;
  //   return this.http.get<Ner>(url);
  // }

  // 向后端传输ner文本
  public importByTXT(payload: ImportNerByTXTPayload): Promise<Ner> {
    console.log('向后端传输ner文本');
    console.log('payload:' + payload);
    const url = `${environment.apiUrl}/ner/txt`;
    const formData = toFormData(payload);
    console.log(formData);

    return this.http.post<Ner>(url, formData).toPromise();
  }

  public importByFile(payload: ImportNerByFilePayload): Promise<Ner> {
    console.log('向后端传输ner文件');
    console.log('payload:' + payload);
    const url = `${environment.apiUrl}/ner/file`;
    const formData = toFormData2(payload);
    console.log(formData);

    return this.http.post<Ner>(url, formData).toPromise();
  }
}

// 将数据打包成form，以方便向后端传输
function toFormData(payload: ImportNerByTXTPayload): FormData {
  console.log('sequence:' + payload.sequence);
  const formData = new FormData();
  formData.append('sequence', payload.sequence);
  return formData;
}

function toFormData2(payload: ImportNerByFilePayload): FormData {
  const formData = new FormData();
  for(var i = 0; i < payload.file_sequence.length; i++) {
    console.log('sequence:' + payload.file_sequence[i]);
    formData.append('file_sequence[${i}]', payload.file_sequence[i]);
  }
  return formData;
}
