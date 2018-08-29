import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { SharedService } from '../services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  public nameshow: boolean = false;
  public phoneshow: boolean = true;
  userForm: FormGroup;
  userFormErrors: any;
  userData: any;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  public mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Phone number validation 

  constructor(private formBuilder: FormBuilder, public userService: UserService, private router: Router, private sharedService: SharedService, public pharmacyService: PharmacyService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.loginFormErrors = {
      phoneNumber: {},
      // name: {}
    };
    this.sharedService.userNumber.subscribe(data => {
      console.log(data);
      this.userData = data;   // STORED LOGIN USER PHONENUMBER

    })
    this.userFormErrors = {
      name: {},
    };
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm()

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
    this.userForm = this.createuserform()

    this.userForm.valueChanges.subscribe(() => {
      this.onUserFormValuesChanged();
    });
  }

  /******************************IT CATCHES ALL CHANGES IN FORM******************/
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
   /*************************** IT CATCHES ALL CHANGES IN FORM***********************/
   onUserFormValuesChanged() {
    for (const field in this.userFormErrors) {
      if (!this.userFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.userFormErrors[field] = {};
      // Get the control
      const control = this.userForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.userFormErrors[field] = control.errors;
      }
    }
  }
  createLoginForm() {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      // name: ['', Validators.required]
    });
  }
  createuserform() {
    return this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  /*******************CREATE LOGIN ***************************/
  saveLoginForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.spinner.show(); /**SHOW LOADER */

      this.sharedService.userCreate(this.loginForm.value); //STORED LOGIN USER PHONENUMBER
      /***********************CHECK USER ALREADY REGISTERED OR NOT*******************/
      this.userService.checkUser(this.loginForm.value).subscribe(data => {
        console.log(data);
        let result: any = {};
        result = data;
        console.log(result.exists)
        if (result.exists == true) {
          localStorage.setItem('phoneNumber', this.loginForm.value.phoneNumber);// SET PHONENUMBER IN LOCAL STORAGE
          let data = {
            user: this.loginForm.value.phoneNumber,
          }
          /****************CHECK PHARMACY EXIST WITH USER PHONENUMBER OR NOT***************/
          this.userService.checkPharmacy(data).subscribe(data => {
            console.log(data);
            let pharmacy: any = {};
            pharmacy = data
            console.log(pharmacy.count)
            if (pharmacy.count === 0) {
              this.router.navigate(['/createpharmacy'])
            }
            else {
              this.router.navigate(['/pharmalist'])
            }
            this.spinner.hide(); /**HIDE LOADER */
          },
            err => {
              this.showError();
            }
          )
        }
        else {
          this.nameshow = true;
          this.phoneshow = false;
          this.submitted=false;
          this.spinner.hide(); /**HIDE LOADER */
          this.toastr.success('Phone Number registered successfully !', 'Follow steps to complete registration', {
            timeOut: 5000
          });
          // this.router.navigate(['/user'])
        }
      },
        err => {
          this.showError();
        })
    }
    else {

    }
  }

  /**************************NEW USER FORM**************************************** */
  saveUserForm() {
    console.log(this.userForm.value);
    this.submitted = true;
    // STOP  HERE IF FORM IS INVALID
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.spinner.show(); /**SHOW LOADER */
      var data: any = {
        phoneNumber: this.userData.phoneNumber,
        name: this.userForm.value.name
      }
      this.userService.newUser(data).subscribe(data => {
        console.log(data)
        localStorage.setItem('phoneNumber', this.userData.phoneNumber);// SET PHONENUMBER IN LOCAL STORAGE
        this.showSuccess();
        this.sharedService.userInfo(data);
        this.router.navigate(['/createpharmacy'])
        this.spinner.hide(); /**HIDE LOADER */
      },
        err => {
          this.showError();
          this.spinner.hide(); /**HIDE LOADER */
        })
    }
  }
  /****************************SHOW TOAST NOTIFICATION********************/
  showSuccess() {
    this.toastr.success('User created!', 'Toastr fun!', {
    });
  }
    // SHOW  TOAST NOTIFICTATION,
    showError() {
      this.toastr.error('Server Error!', 'Major Error', {
      });
    }
  
}

