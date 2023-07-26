import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PerfilComponent } from './perfil/perfil.component';

import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoByIdComponent } from './mantenimientos/medicos/medico-by-id.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
        { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
        { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
        { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del usuario' }},
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},

        //Mantenimientos
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimientos de Medicos' }},
        { path: 'medico/:id', component: MedicoByIdComponent, data: { titulo: 'Mantenimientos de Medico' }},
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimientos de Hospitales' }},
        
        //rutas administrativas 
        { path: 'users', 
          canActivate: [adminGuard],
          component: UsersComponent,    
          data: { titulo: 'Mantenimientos de Usuarios' }},
        { path: '**', redirectTo: ''},
        
      ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
