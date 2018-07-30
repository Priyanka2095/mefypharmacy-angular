import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createpharmacy',
  templateUrl: './createpharmacy.component.html',
  styleUrls: ['./createpharmacy.component.css']
})
export class CreatepharmacyComponent implements OnInit {
  pharmacyForm: FormGroup;
  pharmacyFormErrors: any;
  submitted: boolean = false;

  constructor( private formBuilder: FormBuilder) { 
    this.pharmacyFormErrors = {
      pharmacyName: {},
      primaryContact: {},
      street: {},
      zipCode: {},
      city: {},
      country: {},
      email: {},
    };
  }
  

  ngOnInit() {
    // this.pharmacyForm.valueChanges.subscribe(() => {
    //   this.onPharmacyFormValuesChanged();
    // });
    this.pharmacyForm = this.createpharmacyform()
  }

  // onPharmacyFormValuesChanged() {
  //   for (const field in this.pharmacyFormErrors) {
  //     if (!this.pharmacyFormErrors.hasOwnProperty(field)) {
  //       continue;
  //     }
  //     // Clear previous errors
  //     this.pharmacyFormErrors[field] = {};
  //     // Get the control
  //     const control = this.pharmacyForm.get(field);

  //     if (control && control.dirty && !control.valid) {
  //       this.pharmacyFormErrors[field] = control.errors;
  //     }
  //   }
  // }

  createpharmacyform() {
    return this.formBuilder.group({
      pharmacyName: ['', Validators.required],
      primaryContact: ['', Validators.required],
      alternateContact: [''],
      street:['',Validators.required],
      zipCode:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      email:['',[Validators.required,Validators.email]]
    });
}
savePharmacyForm() {
  // console.log(this.pharmacyForm.value);

  this.submitted = true;
  if (this.pharmacyForm.valid) {
    console.log(this.pharmacyForm.value);
}
}
}