import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { VancomycinRoutingModule } from '@vancomycin/vancomycin-routing.module';
import { components } from '@vancomycin/components';
import { containers } from '@vancomycin/containers';
import { VancomycinState } from '@vancomycin/store';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    SharedModule,
    VancomycinRoutingModule,
    NgxsModule.forFeature([VancomycinState]),
  ],
})
export class VancomycinModule {}
