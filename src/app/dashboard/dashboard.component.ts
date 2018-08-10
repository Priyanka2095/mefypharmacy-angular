import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { PharmacyService } from '../services/pharmacy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

pharmaData:any={};
  constructor(private sharedService: SharedService,public pharmacyService: PharmacyService) {
    this.sharedService.pharmacyDetails.subscribe(data => {
      console.log(data);
      this.pharmaData=data;
    })
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
  })
}
}





