import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from '@core/core-routing.module';
import { CoreMaterialModule } from '@core/core-material.module';
import { components } from '@core/components';
import { containers } from '@core/containers';
import { services } from '@core/services';

@NgModule({
  declarations: [...components, ...containers],
  imports: [CommonModule, CoreRoutingModule, CoreMaterialModule],
  providers: [...services],
})
export class CoreModule {}
