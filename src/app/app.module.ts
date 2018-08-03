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
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import {SharedService} from './services/shared.service';
import { PharmacyService } from './services/pharmacy.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateuserComponent,
    CreatepharmacyComponent,
    DashboardComponent
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
