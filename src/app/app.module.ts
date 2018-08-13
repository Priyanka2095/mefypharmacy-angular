import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PharmalistComponent } from './pharmalist/pharmalist.component';
import { UserService } from './services/user.service';
import {SharedService} from './services/shared.service';
import { PharmacyService } from './services/pharmacy.service';
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    BrowserAnimationsModule, // required animations module
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({   // ToastrModule added
      timeOut: 999,
      preventDuplicates: true,
    }) ,
    TextMaskModule,
    NgxSpinnerModule

  ],
  providers: [UserService,SharedService,PharmacyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
