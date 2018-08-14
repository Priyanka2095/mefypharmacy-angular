import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { PharmacyService } from '../services/pharmacy.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

pharmaData:any={};
userInfo:any
  constructor(private sharedService: SharedService,public pharmacyService: PharmacyService,private spinner: NgxSpinnerService) {
    this.sharedService.pharmacyDetails.subscribe(data => {
      console.log(data);
      this.spinner.hide(); /**Hide LOADER */
      this.pharmaData=data;
    })
    this.userInfo = localStorage.getItem('phoneNumber');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.userInfo)
    this.spinner.show(); /**SHOW LOADER */
    this.getPharmacyDetail();
  }

  ngOnInit() {
  }
//GET PHARMACY DETAIL THROUGH API CALL
getPharmacyDetail(){
  let data={
    id:this.pharmaData.tradeLicenseId   
  }
  console.log(data);
  this.pharmacyService.getPharmacy(data).subscribe(result=>{
    console.log(result);
    let value:any={}
    value=result
    console.log(value)
    // this.pharmaData=
    this.spinner.hide(); /**HIDE LOADER */
  })
}
}





