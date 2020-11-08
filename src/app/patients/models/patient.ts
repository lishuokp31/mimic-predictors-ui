export interface Patient {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  ethnicity: Ethnicity;
}

export type Gender = '男' | '女';
export type Ethnicity = '汉族' | '朝鲜族' | '回族';
