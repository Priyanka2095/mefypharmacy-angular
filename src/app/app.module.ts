import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { CreateuserComponent } from './createuser/createuser.component';
import { CreatepharmacyComponent } from './createpharmacy/createpharmacy.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { PharmacydashboardComponent } from './pharmacydashboard/pharmacydashboard.component';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { PharmalistComponent } from './pharmalist/pharmalist.component';
=======
import { UserService } from './services/user.service';
import {SharedService} from './services/shared.service';
import { PharmacyService } from './services/pharmacy.service';
>>>>>>> c74ca69e0e1f33e35c2c8b73d4552f973d31905b


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateuserComponent,
    CreatepharmacyComponent,
    DashboardComponent,
    PharmacydashboardComponent,
    PharmalistComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

  ],
  providers: [UserService,SharedService,PharmacyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
