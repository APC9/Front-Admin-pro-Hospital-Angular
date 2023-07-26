import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { ImgPipe } from '../pipes/img.pipe';
import { MedicoByIdComponent } from './mantenimientos/medicos/medico-by-id.component';



@NgModule({
  declarations: [
    PagesComponent,
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PerfilComponent,
    UsersComponent,
    HospitalesComponent,
    MedicosComponent,
    ImgPipe,
    MedicoByIdComponent
  ],
  exports:[
    PagesComponent,
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
