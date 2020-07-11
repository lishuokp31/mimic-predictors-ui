import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AppComponent } from './app.component';
import { AppState } from './store';
import { pages } from './pages';
import { components } from './components';
import { services } from './services';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ...pages, ...components],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    NgxChartsModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    ...[!environment.production ? NgxsReduxDevtoolsPluginModule.forRoot() : []],
  ],
  providers: [...services],
  bootstrap: [AppComponent],
})
export class AppModule {}
