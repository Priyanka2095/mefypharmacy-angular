import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createpharmacy',
  templateUrl: './createpharmacy.component.html',
  styleUrls: ['./createpharmacy.component.css']
})
export class CreatepharmacyComponent implements OnInit {
  pharmacyform: FormGroup;
  submitted: boolean = false;

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pharmacyform = this.createpharmacyform()
  }
  createpharmacyform() {
    return this.formBuilder.group({
      pharmacyName: ['', Validators.required],
      primarycontact: ['', Validators.required],
      alternatecontact: ['', Validators.required],

    });
}


savePharmacyForm() {
  this.submitted = true;
  if (this.pharmacyform.valid) {
    console.log(this.pharmacyform.value);
}
}
}