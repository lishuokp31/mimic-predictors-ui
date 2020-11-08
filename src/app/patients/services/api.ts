import { Injectable } from '@angular/core';

import { Patient } from '@patients/models';

@Injectable()
export class PatientsApiService {
  public loadAll(): Promise<Patient[]> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: '130928198905281793',
              name: '葛黎昕',
              gender: '男',
              age: 28,
              ethnicity: '汉族',
            },
            {
              id: '130532197901235712',
              name: '乐淳雅',
              gender: '男',
              age: 38,
              ethnicity: '汉族',
            },
            {
              id: '513221197102183838',
              name: '元圣杰',
              gender: '男',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '610523198305134774',
              name: '平明远',
              gender: '男',
              age: 34,
              ethnicity: '汉族',
            },
            {
              id: '230111197104266110',
              name: '郑靖琪',
              gender: '男',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '510422198603243893',
              name: '齐怡悦',
              gender: '男',
              age: 31,
              ethnicity: '汉族',
            },
            {
              id: '130426198908106712',
              name: '冯德海',
              gender: '男',
              age: 28,
              ethnicity: '汉族',
            },
            {
              id: '500101198401133397',
              name: '罗高卓',
              gender: '男',
              age: 33,
              ethnicity: '汉族',
            },
            {
              id: '140825197508173636',
              name: '顾晟睿',
              gender: '男',
              age: 42,
              ethnicity: '汉族',
            },
            {
              id: '350822197101183592',
              name: '韦俊豪',
              gender: '男',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '522425198109113949',
              name: '贺芳华',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '511826197005258546',
              name: '乐晗蕾',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '431128198405258384',
              name: '郎芳林',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '141032198805257380',
              name: '许和雅',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '331122197508146901',
              name: '康寒香',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '510722197109219021',
              name: '花慧月',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '500103198503111941',
              name: '钱安卉',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '511325197406245048',
              name: '酆春雪',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '610122198502268749',
              name: '鲁芳蕙',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
            {
              id: '231084198808141445',
              name: '水红叶',
              gender: '女',
              age: 46,
              ethnicity: '汉族',
            },
          ]),
        500
      )
    );
  }
}
