import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatepharmacyComponent } from './createpharmacy/createpharmacy.component';
import { PharmacydashboardComponent } from './pharmacydashboard/pharmacydashboard.component';
import { PharmalistComponent } from './pharmalist/pharmalist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: CreateuserComponent },
  { path: 'createpharmacy', component: CreatepharmacyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pharmacydashboard', component: PharmacydashboardComponent },
  { path: 'pharmalist', component: PharmalistComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  // declarations: []
})
export class RoutingModule { }



