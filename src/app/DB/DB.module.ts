import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from '@DB/components';
import { containers } from '@DB/containers';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DBRoutingModule } from '@DB/DB-routing.module';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    NzTabsModule,
    DBRoutingModule

  ],

})
export class DBModule {}
