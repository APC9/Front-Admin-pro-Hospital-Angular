import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    canActivate: [ authGuard ],
    loadChildren: ()=> import('./pages/pages.module').then( m => m.PagesModule )
  },
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: "full"
  },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
