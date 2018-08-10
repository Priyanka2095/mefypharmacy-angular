import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { PharmacyService } from '../services/pharmacy.service';

@Component({
  selector: 'app-pharmalist',
  templateUrl: './pharmalist.component.html',
  styleUrls: ['./pharmalist.component.css']
})
export class PharmalistComponent implements OnInit {
  pharmacyInfo:any;
  pharmacyList:any=[];
  constructor(private sharedShervice:SharedService,public pharmacyService: PharmacyService) {

    // this.sharedShervice.userPharmacyInfo.subscribe(data => {
    //   console.log(data);
    //   this.pharmacyInfo = data;   // STORED  USER DATA FROM Pharmacy PAGE
    // })

    this.sharedShervice.userNumber.subscribe(data => {
      console.log(data);
      this.pharmacyInfo = data.phoneNumber;   // STORED LOGIN USER PHONENUMBER FROM LOGIN PAGE

    })
   }

  ngOnInit() {
    this.getUserPharmacyList()
  }

getUserPharmacyList(){
  let data = {
    phonenumber:this.pharmacyInfo
  }
  console.log(data);
  this.pharmacyService.getUserPharmacy(data).subscribe(value=>{
    console.log(value); 
    let result:any ={};
    result=value
    this.pharmacyList=result.pharmacies
    console.log(this.pharmacyList)
  })
}
}
