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
  submitted: boolean = false;  //SHOW ERROR,IF INVALID FORM IS SUBMITTED

  constructor( private formBuilder: FormBuilder) { 
    this.pharmacyFormErrors = {
      pharmacyName: {},
      primaryContact: {},
      street: {},
      zipCode: {},
      city: {},
      country: {},
      email: {},
      trade: {},
      drug: {},
      degree: {},
    };
  }
  

  ngOnInit() {
    this.pharmacyForm = this.createpharmacyform()

       this.pharmacyForm.valueChanges.subscribe(() => {
      this.onPharmacyFormValuesChanged();
    });
  }
// IT CATCHES ALL CHANGES IN FORM
  onPharmacyFormValuesChanged() {
    for (const field in this.pharmacyFormErrors) {
      if (!this.pharmacyFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.pharmacyFormErrors[field] = {};
      // Get the control
      const control = this.pharmacyForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.pharmacyFormErrors[field] = control.errors;
      }
    }
  }

  createpharmacyform() {
    return this.formBuilder.group({
      pharmacyName: ['', Validators.required],
      primaryContact: ['', Validators.required],
      alternateContact: [''],
      street:['',Validators.required],
      zipCode:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      drug:['',Validators.required],
      trade:['',Validators.required],
      degree:['',Validators.required]
    });
}

// CREATE NEW PHARMACY
savePharmacyForm() {
  this.submitted = true;
    // STOP  HERE IF FORM IS INVALID
  if (this.pharmacyForm.valid) {
    console.log(this.pharmacyForm.value);
}
}
// file upload
// upload(event) {
//   let fileList: FileList = event.target.files;
//   let fileTarget = fileList;
//   let file: File = fileTarget[0];
//   this.names = file;
//   console.log("File information :", file.name);
//   let formData: FormData = new FormData();
//   formData.append('file', file, file.name);
//   this.discussionService.fileUpload(formData).subscribe(result => {
//     this.files.push(result.upload._id)

//   }, err => {
//   });
// }
}