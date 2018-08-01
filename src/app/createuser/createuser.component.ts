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
    
    this.userForm.valueChanges.subscribe(() => {
      this.onUserFormValuesChanged();
    });
  }
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

  createuserform() {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
}
saveUserForm() {
  console.log(this.userForm.value);

  this.submitted = true;
  // STOP  HERE IF FORM IS INVALID
  if (this.userForm.valid) {
    console.log(this.userForm.value);
}
}

}
