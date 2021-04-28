import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from '@user/user-routing.module';
import { components } from '@user/components';
import { containers } from '@user/containers';

@NgModule({
  declarations: [...containers, ...components],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
