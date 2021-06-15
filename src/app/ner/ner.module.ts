//根组件
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { NerRoutingModule } from '@ner/ner-routing.module';
import { NerState } from '@ner/store';
import { components } from '@ner/components';
import { containers } from '@ner/containers';
import { services } from '@ner/services';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { AgGridModule } from 'ag-grid-angular';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';

/* @NgModule装饰器,@NgModule接受一个元数据对象,告诉Angular如何编译和启动应用 */
@NgModule({
  declarations: [...containers, ...components] /* 配置当前项目运行的组件 */,
  imports: [
    /* 配置当前模块运行依赖的其他模块 */ CommonModule,
    NerRoutingModule,
    NzTabsModule,
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    NzUploadModule,
    AgGridModule,
    IconsProviderModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSelectModule,
    NzModalModule,
    NzAlertModule,
    NgxsModule.forFeature([NerState]),
  ],
  providers: [...services,{provide:NzMessageService}], /* 配置项目所需要的服务 */
  // bootstrap: [AppComponent] /* 指定应用的主视图(称为根组件)通过引导根AppModule来启动应用,这里一般写的是根组件 */
})
//根模块不需要导出任何东西,因为其他组件不需要导入根模块
export class NerModule {}
