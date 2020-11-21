export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  ethnicity: Ethnicity;
  added_at: string;
  updated_at: string;
  metrics?: PatientMetric[];
  probabilities?: PatientProbabilities;
}

export interface PatientMetric {
  label: string;
  unit: string;
  mean: number;
  min: number;
  max: number;
  std: number;
}

export interface PatientProbabilities {
  aki: number[];
  sepsis: number[];
  mi: number[];
  vancomycin: number[];
}

export type Gender = '男' | '女';
export enum Ethnicity {
  '汉族' = '汉族',
  '满族' = '满族',
  '蒙古族' = '蒙古族',
  '回族' = '回族',
  '藏族' = '藏族',
  '维吾尔族' = '维吾尔族',
  '苗族' = '苗族',
  '彝族' = '彝族',
  '壮族' = '壮族',
  '布依族' = '布依族',
  '侗族' = '侗族',
  '瑶族' = '瑶族',
  '白族' = '白族',
  '土家族' = '土家族',
  '哈尼族' = '哈尼族',
  '哈萨克族' = '哈萨克族',
  '傣族' = '傣族',
  '黎族' = '黎族',
  '傈僳族' = '傈僳族',
  '佤族' = '佤族',
  '畲族' = '畲族',
  '高山族' = '高山族',
  '拉祜族' = '拉祜族',
  '水族' = '水族',
  '东乡族' = '东乡族',
  '纳西族' = '纳西族',
  '景颇族' = '景颇族',
  '柯尔克孜族' = '柯尔克孜族',
  '土族' = '土族',
  '达斡尔族' = '达斡尔族',
  '仫佬族' = '仫佬族',
  '羌族' = '羌族',
  '布朗族' = '布朗族',
  '撒拉族' = '撒拉族',
  '毛南族' = '毛南族',
  '仡佬族' = '仡佬族',
  '锡伯族' = '锡伯族',
  '阿昌族' = '阿昌族',
  '普米族' = '普米族',
  '朝鲜族' = '朝鲜族',
  '塔吉克族' = '塔吉克族',
  '怒族' = '怒族',
  '乌孜别克族' = '乌孜别克族',
  '俄罗斯族' = '俄罗斯族',
  '鄂温克族' = '鄂温克族',
  '德昂族' = '德昂族',
  '保安族' = '保安族',
  '裕固族' = '裕固族',
  '京族' = '京族',
  '塔塔尔族' = '塔塔尔族',
  '独龙族' = '独龙族',
  '鄂伦春族' = '鄂伦春族',
  '赫哲族' = '赫哲族',
  '门巴族' = '门巴族',
  '珞巴族' = '珞巴族',
  '基诺族' = '基诺族',
}
