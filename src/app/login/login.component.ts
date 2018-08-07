import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED

  constructor(private formBuilder: FormBuilder, public userService: UserService, private router: Router, private sharedService: SharedService) {
    this.loginFormErrors = {
      phoneNumber: {},
    };
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm()

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  // IT CATCHES ALL CHANGES IN FORM
  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.loginFormErrors[field] = {};
      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }
  createLoginForm() {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.required]
    });
  }
  // CREATE LOGIN 
  saveLoginForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
    this.sharedService.userCreate(this.loginForm.value); //STORED LOGIN USER PHONENUMBER
    //CHECK USER ALREADY REGISTERED OR NOT
    this.userService.checkUser(this.loginForm.value).subscribe(data => {
      console.log(data);
      let result: any = {};
      result = data;
      console.log(result.exists)
      if (result.exists) {
        localStorage.setItem('phoneNumber', this.loginForm.value.phoneNumber);// SET PHONENUMBER IN LOCAL STORAGE
        let data = {
          user: this.loginForm.value.phoneNumber
        }
        //CHECK PHARMACY EXIST WITH USER PHONENUMBER OR NOT
        this.userService.checkPharmacy(data).subscribe(data => {
          console.log(data);
          let pharmacy: any = {};
          pharmacy = data
          console.log(pharmacy.count)
          if (pharmacy.count==0) {
            this.router.navigate(['/createpharmacy'])
          }
          else {
            this.router.navigate(['/pharmacydashboard'])
          }
        })
      }
      else {
        this.router.navigate(['/user'])
      }
    },
      err => {

      })
  }
}
