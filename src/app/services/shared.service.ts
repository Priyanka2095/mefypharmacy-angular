import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  pharmacyDetails: BehaviorSubject<any> = new BehaviorSubject({});
  userNumber: BehaviorSubject<any> = new BehaviorSubject({});
  userData:BehaviorSubject<any> = new BehaviorSubject({});;


  constructor() { }

  pharmacyInfo(params){
    this.pharmacyDetails.next(params);
  }
  // SAVE USER NUMBER,FOR CREATE 
  userCreate(params){
    this.userNumber.next(params)
  }
  userInfo(params){
    this.userData.next(params)
  }

}
