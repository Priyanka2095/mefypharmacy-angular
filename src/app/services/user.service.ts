import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { APIURL } from '../urlConfig';
// import { map, tap } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
// import { Observable} from "rxjs";
// import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,) { }
  
  // CHECK USER,ITS EXIST OR NOT
checkUser(phoneNumber){
  console.log(phoneNumber)
  console.log(APIURL+'User/',phoneNumber.phoneNumber)
  return this.http.get(APIURL+'User/'+phoneNumber.phoneNumber +'/exists')

  // .catchError(this.errorHandler)        
}
/************************** CREATE NEW USER*********************/
newUser(data){
  console.log(data)
  return this.http.post(APIURL+'User',data)
}
/***************************CHECK USER HAS PHARMACY OR NOT************************/
checkPharmacy(user){
  console.log(user.user) //USERID:USER'S PHONENUMBER
  console.log(APIURL+'UserPharmacy/count?where{"user":"'+user.user+'"}')
  // return this.http.get(APIURL+'UserPharmacy/count?filter={"where":{"user":"'+user.user+'"}}');
  return this.http.get(APIURL+'UserPharmacy/count?where={"user":"'+user.user+'"}');


}
// errorHandler(error:HttpErrorResponse){
//   return Observable.throw(error.message||'Server Error')
// }

}