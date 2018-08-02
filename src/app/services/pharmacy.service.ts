import { Injectable } from '@angular/core';
import { APIURL } from '../urlConfig';
import { FILEURL } from '../urlConfig';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private httpClient: HttpClient) { }

  // PHARMACY CREATION METHOD
  addPharmacy(data) {
    console.log(data)
    return this.httpClient.post(APIURL + 'pharmacy', data)
  }

  // FILE UPLOAD METHOD
  fileUpload(data) {
    console.log('file data',data)
    return this.httpClient.post(FILEURL, data)
  }


}
