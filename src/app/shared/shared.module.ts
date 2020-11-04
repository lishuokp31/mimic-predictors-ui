import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedMaterialModule } from '@shared/shared-material.module';
import { components } from '@shared/components';
import { dialogs } from '@shared/dialogs';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NgxChartsModule,
  ],
  declarations: [...components, ...dialogs],
  exports: [CommonModule, ...components],
})
export class SharedModule {}
