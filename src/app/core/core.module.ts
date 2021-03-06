import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from '@core/core-routing.module';
import { CoreMaterialModule } from '@core/core-material.module';
import { components } from '@core/components';
import { containers } from '@core/containers';
import { services } from '@core/services';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';

import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { MatDialogModule } from '@angular/material/dialog';

import {LoginApiService} from '@login/servers';


registerLocaleData(zh);
@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CoreRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzSwitchModule,
    MatDialogModule,
    // NgZorroAntdModule,
  ],
  providers: [...services , LoginApiService,{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {}
