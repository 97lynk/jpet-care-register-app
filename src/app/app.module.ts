// app.module.ts OR a shared material.module.ts
import {NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {provideTranslateService, TranslateModule} from "@ngx-translate/core";
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from "@angular/material/radio";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from "@angular/material/divider";

import {QRCodeComponent} from "angularx-qrcode";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {
  AppointmentDetailsComponent
} from "./register-for-vaccination/appointment-details/appointment-details.component";
import {RegisterSuccessComponent} from "./register-for-vaccination/register-success/register-success.component";
import {CustomerInfoFormComponent} from './register-for-vaccination/customer-info-form/customer-info-form.component';
import {PetInfoFormComponent} from './register-for-vaccination/pet-info-form/pet-info-form.component';
import {VaccineComboFormComponent} from './register-for-vaccination/vaccine-combo-form/vaccine-combo-form.component';
import {
  VaccineIndividualFormComponent
} from "./register-for-vaccination/vaccine-individual-form/vaccine-individual-form.component";
import {RegisterForVaccinationComponent} from './register-for-vaccination/register-for-vaccination.component';

@NgModule({
  declarations: [
    CustomerInfoFormComponent,
    PetInfoFormComponent,
    VaccineComboFormComponent,
    RegisterForVaccinationComponent,
    AppointmentDetailsComponent,
    VaccineIndividualFormComponent,
    RegisterSuccessComponent,
    AppComponent,
  ],
  bootstrap: [AppComponent],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    MatTableModule,

    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot(), QRCodeComponent,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
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
      useValue: {floatLabel: 'always', appearance: 'outline'}
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ja-JP'
    },
  ]
})
export class AppModule {
}
