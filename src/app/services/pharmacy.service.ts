import { Injectable } from '@angular/core';
import { APIURL } from '../urlConfig';
import { FILEURL } from '../urlConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient: HttpClient) { }

  // PHARMACY CREATION METHOD
  addPharmacy(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'pharmacy', data)
    // return new Promise((resolve, reject) => {
    //   this.httpClient.post(APIURL + 'pharmacy', data)
    //     .pipe(
    //       tap(console.log),
    //       map(res => res)
    //     )
    //     .subscribe(response => {
    //       console.log(response);
    //       resolve(response);
    //     }, function (error) {
    //       resolve(error.json());
    //     })

    // })
    //     let promise = new Promise((resolve,reject)=>{
    // this.httpClient.post(APIURL+'pharmacy',data)
    // .toPromise()
    // .then(
    //   res=>{
    //     console.log(res)
    //   }
    // )
    //     });
    //     return promise;
  }

  // FILE UPLOAD METHOD
  fileUpload(data) {
    console.log('file data', data)
    return this.httpClient.post(FILEURL, data)
    // return new Promise((resolve, reject) => {
    //   debugger
    //   this.httpClient.post(FILEURL , data)
    //     .pipe(
    //       tap(console.log),
    //       map(res => res)
    //     )
    //     .subscribe(response => {
    //       console.log(response);
    //       resolve(response);
    //     }, function (error) {
    //       resolve(error.json());
    //     })

    // })
  }
  // CREATE PHARMACY AGAINST USER
  userPharmacy(data) {
    console.log(data);
    return this.httpClient.post(APIURL + 'UserPharmacy', data)
  }
  //GET PHARMACY LIST BY USER'S PHONENUMBER
  getUserPharmacy(phoneNumber) {
    console.log(phoneNumber)
    return this.httpClient.get(APIURL + 'UserPharmacy/user?phonenumber=' + phoneNumber.phonenumber);
  }
  //GET PHARMACY DETAIL BY TRADE LICENSE ID
  getPharmacy(tradeId) {
    return this.httpClient.get(APIURL + 'Pharmacy/' + tradeId.id)
  }
     // catch errors
// public handleError = (error: Response) => {
//   return Observable.throw(error.json());
//  }
}