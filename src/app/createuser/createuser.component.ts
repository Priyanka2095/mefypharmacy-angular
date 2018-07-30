import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  userForm: FormGroup;
  userFormErrors: any;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) {
    this.userFormErrors = {
      name: {},
    };
   }

  ngOnInit() {
    this.userForm = this.createuserform()
  }
  createuserform() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
}
saveUserForm() {

  this.submitted = true;
  if (this.userForm.valid) {
    console.log(this.userForm.value);
}
}

}
