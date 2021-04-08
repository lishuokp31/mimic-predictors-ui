// 前后数据传输的捆绑包
export interface ImportNerByTXTPayload {
  sequence: string;
}

export interface ImportNerByFilePayload {
  importfile: File;
}

// export interface ImportNerPayload {
//   sequence: string;
//   file_import: boolean;
//   importfile: File;
// }
