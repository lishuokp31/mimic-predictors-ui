//根组件
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { LoginRoutingModule } from '@login/login-routing.module';
import { components } from '@login/components';
import { containers } from '@login/containers';
import { services } from '@login/servers';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

/* @NgModule装饰器,@NgModule接受一个元数据对象,告诉Angular如何编译和启动应用 */
@NgModule({
  declarations: [...containers, ...components] /* 配置当前项目运行的组件 */,
  imports: [
    /* 配置当前模块运行依赖的其他模块 */ CommonModule,
    LoginRoutingModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCheckboxModule,
  ],
  providers: [...services], /* 配置项目所需要的服务 */
  // bootstrap: [AppComponent] /* 指定应用的主视图(称为根组件)通过引导根AppModule来启动应用,这里一般写的是根组件 */
})
//根模块不需要导出任何东西,因为其他组件不需要导入根模块
export class LoginModule {}
