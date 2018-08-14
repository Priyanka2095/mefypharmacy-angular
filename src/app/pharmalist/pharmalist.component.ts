import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { PharmacyService } from '../services/pharmacy.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pharmalist',
  templateUrl: './pharmalist.component.html',
  styleUrls: ['./pharmalist.component.css']
})
export class PharmalistComponent implements OnInit {
  pharmacyInfo:any;
  pharmacyList:any=[];
  userInfo:any
  constructor(private sharedShervice:SharedService,public pharmacyService: PharmacyService,private spinner: NgxSpinnerService) {

    this.userInfo = localStorage.getItem('phoneNumber');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.userInfo)
   }

  ngOnInit() {
    this.getUserPharmacyList()
  }

getUserPharmacyList(){
  let data = {
    phonenumber:this.userInfo
  }
  console.log(data);
  this.spinner.show(); /**SHOW LOADER */
  this.pharmacyService.getUserPharmacy(data).subscribe(value=>{
    console.log(value); 
    let result:any ={};
    result=value
    this.pharmacyList=result.pharmacies
    console.log(this.pharmacyList)
    this.spinner.hide();  /**HIDE LOADER */
  })
}
}
