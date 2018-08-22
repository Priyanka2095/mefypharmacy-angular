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
  message: any;
  showMessage = false
 selectedName:any;
  constructor(private sharedShervice: SharedService, public pharmacyService: PharmacyService, private spinner: NgxSpinnerService, private router: Router) {

    this.userInfo = localStorage.getItem('phoneNumber');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.userInfo)
    if(this.userInfo==null){
      this.router.navigate(['/login'])   /*GO BACK TO LOGIN PAGE**/
    }
  }

  ngOnInit() {
    this.getUserPharmacyList()
  }
  /************************GET PHARMACY LIST AGAINST USER************** */
  getUserPharmacyList() {
    let data = {
      phonenumber: this.userInfo
    }
    console.log(data);
    this.spinner.show(); /**SHOW LOADER */
    let _base = this;
    setTimeout(function () {
      _base.pharmacyService.getUserPharmacy(data).subscribe(value => {
        console.log(value);
        let result: any = {};
        result = value
        _base.pharmacyList = result.pharmacies
        console.log(_base.pharmacyList)
        if (_base.pharmacyList.length == 0) {
          console.log(_base.pharmacyList.length)
          _base.message = "There is no any Pharmacy list";
          _base.showMessage = true
        }
        _base.spinner.hide();  /**HIDE LOADER */
      })
    }, 5000);
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
  logout() {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('tradeId');
    this.router.navigate(['/login'])
  }

  
//  highlightRow(emp) {
//     this.selectedName = emp.name;
//     console.log(this.selectedName)
//   }
}
