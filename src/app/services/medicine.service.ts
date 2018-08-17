import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../urlConfig';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }
  /*********************DRUG TYPE METHOD**********************/
  createdrug(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'DrugType', data)
  }

  /*************************GET DRUG TYPE*******************/
  getDrugType() {
    return this.httpClient.get(APIURL + 'DrugType')
  }
  /******************* CREATE MEDICINE MASTER*****************************/
  createMedicineMaster(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'MedicineMaster', data)
  }
  // ***********************VENDOR METHOD************************************/
  createVendor(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'Vendor', data)
  }
   // *********************** GET MEDICINE LIST************************************/
   getMedicine() {
    return this.httpClient.get(APIURL + 'MedicineMaster')
  }
    /*************************GET DRUG TYPE*******************/
    getVendorType() {
      return this.httpClient.get(APIURL + 'Vendor')
    }
  /*****************************CREATE MANUFACTURE****************/
  createManufacture(data){
    console.log(data);
    return this.httpClient.post(APIURL+ 'Manufacturer',data)
  }
   /**************************GET PHARMACY DETAIL BY TRADE LICENSE ID*************************/
   getPharmacy(tradeId) {
     console.log(tradeId)
    return this.httpClient.get(APIURL + 'Pharmacy/' + tradeId)
  }
}
