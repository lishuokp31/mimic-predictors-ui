import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { CoreModule } from '@core/core.module';
import { MainComponent } from '@core/containers';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    ...[!environment.production ? NgxsReduxDevtoolsPluginModule.forRoot() : []],
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
