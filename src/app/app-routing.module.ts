import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterForVaccinationComponent} from "./components/register-for-vaccination/register-for-vaccination.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterForVaccinationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
