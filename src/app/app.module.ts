import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing.module';
import { CreateuserComponent } from './createuser/createuser.component';
import { CreatepharmacyComponent } from './createpharmacy/createpharmacy.component';
import { HttpClientModule } from '@angular/common/http';
import { PharmacydashboardComponent } from './pharmacydashboard/pharmacydashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { PharmalistComponent } from './pharmalist/pharmalist.component';
import { UserService } from './services/user.service';
import {SharedService} from './services/shared.service';
import { PharmacyService } from './services/pharmacy.service';
import { MedicineService} from './services/medicine.service'
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { TagInputModule } from 'ngx-chips';
import { TypeaheadModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateuserComponent,
    CreatepharmacyComponent,
    PharmacydashboardComponent,
    PharmalistComponent
  ],
  imports: [
    BrowserModule,
    TagInputModule,
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
    NgxSpinnerModule,
    NgxPaginationModule,
    TypeaheadModule.forRoot(),
    TooltipModule
  ],
  providers: [UserService,SharedService,PharmacyService,MedicineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
