import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { components } from '@shared/components';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, NgxChartsModule],
  declarations: [...components],
  exports: [CommonModule, ...components],
})
export class SharedModule {}
