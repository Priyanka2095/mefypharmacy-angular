import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmacyService } from '../services/pharmacy.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  // userData:any;
  userInfo: any;

  constructor(private formBuilder: FormBuilder, public PharmacyService: PharmacyService, private router: Router, private SharedService: SharedService, private toastr: ToastrService) {
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
    this.SharedService.userNumber.subscribe(data => {
      console.log(data);
      this.userInfo = data;   // STORED LOGIN USER PHONENUMBER FROM LOGIN PAGE

    })
    this.SharedService.userData.subscribe(data => {
      console.log(data);
      this.userInfo = data;   // STORED  USER DATA FROM USERCREATE PAGE

    })
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
      this.PharmacyService.addPharmacy(pharmacyData).then(result => {
        console.log(result)
        this.showPharmmacySuccess();
        let pharmacyData: any = {};
        pharmacyData = result
        /*******CREATE PHARMACY AGAINST USER*****/
        if(pharmacyData!={}){
        let data = {
          user: this.userInfo.phoneNumber,
          pharmacy: pharmacyData.tradeLicenseId,
          recordId: "",
          role: "admin"
        }
        console.log(data)
        this.PharmacyService.userPharmacy(data).subscribe(value => {
          console.log(value);
          this.SharedService.userPharmacy(value); /**STORE USERPHARMACY DETAIL */
          this.router.navigate(['/dashboard']);
        },
          err => {
            console.log(err)
          })
        }
        this.SharedService.pharmacyInfo(result);  /****STORE PHARMACY DETAIL */
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
    this.PharmacyService.fileUpload(formData).then(response => {
      this.showSuccess();
      console.log(response);
      let result: any = {};
      result = response;
      if (type == "degree") {
        this.degreeId = result.upload._id;
console.log(this.degreeId)
        // this.pharmacyForm.controls['degree'].setValue(response.upload._id);
        // this.pharmacyForm.patchValue({degree: response.upload._id}) 
      }
      else if (type == "drug") {
        this.drugId = result.upload._id;
        console.log(this.drugId)
      }
      else if (type == "trade") {
        this.tradeId = result.upload._id;
        console.log(this.tradeId)
      }
      console.log(this.pharmacyForm.value)
    }, err => {
      console.log(err);
    });
  }
    //SHOW TOAST NOTIFICATION
    showSuccess() {
      this.toastr.success('File Uploded!', 'Toastr fun!', {
      });
    }
     //SHOW TOAST NOTIFICATION
     showPharmmacySuccess() {
      this.toastr.success('Pharmacy Created!', 'Toastr fun!', {
      });
    }
     // SHOW  TOAST NOTIFICTATION,
     showError() {
      this.toastr.error('Server Error!', 'Major Error', {
      });
    }
}