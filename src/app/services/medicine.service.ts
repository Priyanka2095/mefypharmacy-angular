import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../urlConfig';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }
    // DRUG TYPE METHOD
    drugdesc(data) {
      console.log(data)
      return this.httpClient.post(APIURL + 'DrugType', data)
    }
}
