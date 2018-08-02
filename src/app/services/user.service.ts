import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  // CHECK USER,ITS EXIST OR NOT
checkUser(phoneNumber){
  this.http.post
}

// CREATE NEW USER
NewUser(){
  
}
}