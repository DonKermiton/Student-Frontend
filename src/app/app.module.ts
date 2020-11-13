import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {NotifierModule} from 'angular-notifier';
import {SharedModule} from './shared/shared.module';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {LoggedInterceptor} from "./auth/interceptors/logged.interceptor";
// import {LoggedInterceptor} from './auth/interceptors/logged.interceptor';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(),
    SharedModule,
    AngularFileUploaderModule,
  ],
  // providers: [ {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: LoggedInterceptor,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }

