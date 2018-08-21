import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pharmalist',
  templateUrl: './pharmalist.component.html',
  styleUrls: ['./pharmalist.component.css']
})
export class PharmalistComponent implements OnInit {
  pharmacyInfo: any;
  pharmacyList: any = [];
  userInfo: any
  selectedRow = false;
  message:any;
  showMessage=false
  constructor(private sharedShervice: SharedService, public pharmacyService: PharmacyService, private spinner: NgxSpinnerService, private router: Router) {

    this.userInfo = localStorage.getItem('phoneNumber');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.userInfo)
  }

  ngOnInit() {
    if(this.pharmacyList!=[])
    {
    this.getUserPharmacyList()
    }
    else{
      this.showMessage=true
      this.message="Thereis no any Pharmacy list";
     
    }
  }
  /************************GET PHARMACY LIST AGAINST USER************** */
  getUserPharmacyList() {
    let data = {
      phonenumber: this.userInfo
    }
    console.log(data);
    this.spinner.show(); /**SHOW LOADER */
    this.pharmacyService.getUserPharmacy(data).subscribe(value => {
      console.log(value);
      let result: any = {};
      result = value
      this.pharmacyList = result.pharmacies
      console.log(this.pharmacyList)
      this.spinner.hide();  /**HIDE LOADER */
    })
  }
  setClickedRow(data) {
    this.selectedRow = true
    console.log(data)
    let result: any = {};
    result = data
    localStorage.setItem('tradeId', result.pharmacy[0].tradeLicenseId);// SET TRADEID IN LOCAL STORAGE

    this.router.navigate(['/dashboard'])
  }
   /**************************CLEAR LOCAL STORAGE**********************/
   logout(){
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('tradeId');
    this.router.navigate(['/login'])
  }
}
