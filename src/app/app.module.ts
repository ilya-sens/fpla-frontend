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
import {Ng2OrderModule} from "ng2-order-pipe";
import {ResourceModule} from "ngx-resource";
import {authHttpServiceFactory, AuthModule} from "./auth.module";
import {AuthHttp} from "angular2-jwt";
import {CommonModule} from "@angular/common";
import {Ng2DragDropModule} from "ng2-drag-drop";


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
        AuthModule,
        CommonModule,
        AppRoutingModule,
        Ng2OrderModule,
        Ng2DragDropModule.forRoot(),
        ResourceModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        AlertService,
        {provide: RequestOptions, useClass: DefaultRequestOptions},
        {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
