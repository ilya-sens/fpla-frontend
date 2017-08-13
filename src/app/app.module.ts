import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {AuthenticationService} from "./shared/services/authentication.service";
import {AlertService} from "./shared/services/alert.service";
import {DefaultRequestOptions} from "./default-request-options";

export let GLOBAL_HEADERS: Array<any> = [{'Content-Type':'application/json'}];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        AlertService,
        {provide: RequestOptions, useClass: DefaultRequestOptions }
    ],
    bootstrap: [AppComponent
    ]
})
export class AppModule {
}
