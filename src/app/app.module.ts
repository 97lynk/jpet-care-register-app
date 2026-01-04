import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {provideTranslateService, TranslateModule} from '@ngx-translate/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';

import {QRCodeComponent} from 'angularx-qrcode';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';

import {environment} from '../environments/environment';
import {mockHttpInterceptor} from './services/mock-http-interceptor';

@NgModule({
  declarations: [
    AppComponent, // Only AppComponent remains declared here
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    QRCodeComponent,
    MatNativeDateModule, // Keep providers for global config
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Conditionally provide the mock interceptor using the modern `withInterceptors`
    provideHttpClient(
      withInterceptors(environment.useMock ? [mockHttpInterceptor] : [])
    ),
    provideTranslateService({
      lang: 'ja',
      fallbackLang: 'ja',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always', appearance: 'outline' }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ja-JP'
    },
  ]
})
export class AppModule {
}
