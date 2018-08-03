import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  pharmacyDetails: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }

  pharmacyInfo(params){
    this.pharmacyDetails.next(params);
  }
}
