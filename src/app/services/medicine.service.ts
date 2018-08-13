import { Injectable } from '@angular/core';
import { DRUG } from '../urlConfig';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }
    // DRUG TYPE METHOD
    drugdesc(data) {
      console.log(data)
      return this.httpClient.post(DRUG + 'drugdata', data)
    }
}
