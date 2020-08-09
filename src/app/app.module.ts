import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { CoreModule } from '@core/core.module';
import { MainComponent } from '@core/containers';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot([]),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    ...[!environment.production ? NgxsReduxDevtoolsPluginModule.forRoot() : []],
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
