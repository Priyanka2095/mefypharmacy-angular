import { Injectable } from '@angular/core';
import { APIURL } from '../urlConfig';
import { FILEURL } from '../urlConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient: HttpClient) { }

  /****************************** PHARMACY CREATION METHOD******************/
  addPharmacy(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'pharmacy', data)
  }

  /****************************FILE UPLOAD METHOD*****************************/
  fileUpload(data) {
    console.log('file data', data)
    return this.httpClient.post(FILEURL, data)
  }

  /*******************************CREATE PHARMACY AGAINST USER**********************/
  userPharmacy(data) {
    console.log(data);
    return this.httpClient.post(APIURL + 'UserPharmacy', data)
  }
  /******************GET PHARMACY LIST BY USER'S PHONENUMBER************************/
  getUserPharmacy(phoneNumber) {
    console.log(phoneNumber)
    return this.httpClient.get(APIURL + 'UserPharmacy/user?phonenumber=' + phoneNumber.phonenumber);
  }
  // catch errors
  // public handleError = (error: Response) => {
  //   return Observable.throw(error.json());
  //  }
}