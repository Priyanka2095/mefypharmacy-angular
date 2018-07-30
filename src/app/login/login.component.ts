import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginFormErrors = {
      phoneNumber: {},
    };
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm()
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
  }
}
