import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import {
  NGXS_DATA_STORAGE_CONTAINER,
  NGXS_DATA_STORAGE_EXTENSION,
} from '@ngxs-labs/data/storage';

import { CoreModule } from '@core/core.module';
import { MainComponent } from '@core/containers';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules }),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
    NgxsDataPluginModule.forRoot([
      NGXS_DATA_STORAGE_EXTENSION,
      NGXS_DATA_STORAGE_CONTAINER,
    ]),
    ...(!environment.production
      ? [
          NgxsReduxDevtoolsPluginModule.forRoot(),
          NgxsLoggerPluginModule.forRoot(),
        ]
      : []),
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
