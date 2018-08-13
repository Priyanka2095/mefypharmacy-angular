import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../urlConfig';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }
  /********************8 DRUG TYPE METHOD**********************/
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
    return this.httpClient.post(APIURL + 'MedicineMaster', data)
  }
}
