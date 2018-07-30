import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatepharmacyComponent } from './createpharmacy/createpharmacy.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: CreateuserComponent },
  { path: 'createpharmacy', component: CreatepharmacyComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  // declarations: []
})
export class RoutingModule { }



