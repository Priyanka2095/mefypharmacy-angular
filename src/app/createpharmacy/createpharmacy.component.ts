import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyService } from '../services/pharmacy.service';
import {SharedService} from '../services/shared.service';
import { ActivatedRoute ,Router} from '@angular/router';
@Component({
  selector: 'app-createpharmacy',
  templateUrl: './createpharmacy.component.html',
  styleUrls: ['./createpharmacy.component.css']
})
export class CreatepharmacyComponent implements OnInit {
  pharmacyForm: FormGroup;
  pharmacyFormErrors: any;
  submitted: boolean = false;  //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  degreeId: any;
  tradeId: any;
  drugId: any;

  constructor(private formBuilder: FormBuilder, private PharmacyService: PharmacyService,private router: Router,private SharedService:SharedService) {
    this.pharmacyFormErrors = {
      pharmacyName: {},
      primaryContact: {},
      street: {},
      zipCode: {},
      city: {},
      country: {},
      email: {},
      gstNo: {},
      trade: {},
      drug: {},
      degree: {},
      tradeId: {}
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
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gstNo: ['', Validators.required],
      drug: ['', Validators.required],
      trade: ['', Validators.required],
      degree: ['', Validators.required],
      tradeId: ['', Validators.required]
    });
  }

  // CREATE NEW PHARMACY
  savePharmacyForm() {
    this.submitted = true;
    console.log('pharmcay form data', this.pharmacyForm.value)
    /********** STOP  HERE IF FORM IS INVALID **********/
    if (this.pharmacyForm.valid) {
      /***** Data To be sent to APICALL***** */
      let pharmacyData = {
        tradeLicenseId: this.pharmacyForm.value.tradeId,
        pharmacyName: this.pharmacyForm.value.pharmacyName,
        primaryContact: this.pharmacyForm.value.primaryContact,
        alternateContact: this.pharmacyForm.value.alternateContact,
        email: this.pharmacyForm.value.email,
        address: {
          street: this.pharmacyForm.value.street,
          city: this.pharmacyForm.value.city,
          country: this.pharmacyForm.value.country,
          zipcode: this.pharmacyForm.value.zipCode
        },
        gstNo: this.pharmacyForm.value.gstNo,
        degreeFile: this.degreeId,
        drugLicense: this.drugId,
        tradeLicense: this.tradeId,
      }
      console.log(pharmacyData);
      /***** Data To be sent to APICALL ends AND API CALL STARTS***** */
      this.PharmacyService.addPharmacy(pharmacyData).subscribe(result => {
        console.log(result)
        this.SharedService.pharmacyInfo(result);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error)
      })

    }
  }


  //FILE UPLOAD SECTION
  upload(event, type) {
    console.log(event + 'file upload' + type)
    console.log(event.target)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.PharmacyService.fileUpload(formData).subscribe(response => {
      console.log(response);
      if (type == "degree") {
        this.degreeId = response.upload._id;

        // this.pharmacyForm.controls['degree'].setValue(response.upload._id);
        // this.pharmacyForm.patchValue({degree: response.upload._id}) 
      }
      else if (type == "drug") {
        this.drugId = response.upload._id;
      }
      else if (type == "trade") {
        this.tradeId = response.upload._id;
      }
      console.log(this.pharmacyForm.value)
    }, err => {
      console.log(err);
    });
  }
}