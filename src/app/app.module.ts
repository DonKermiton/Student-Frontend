import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {NotifierModule} from 'angular-notifier';
import {SharedModule} from './shared/shared.module';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {LoggedInterceptor} from "./auth/interceptors/logged.interceptor";
import {ErrorhandlerInterceptor} from './auth/interceptors/errorhandler.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


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
        FontAwesomeModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorhandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggedInterceptor,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

