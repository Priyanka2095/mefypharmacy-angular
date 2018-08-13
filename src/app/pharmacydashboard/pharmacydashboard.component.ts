import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  medicineForm: FormGroup;
  manuactureForm:FormGroup
  medicineFormErrors: any;
  manufactureFormerrors:any

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder,private spinner: NgxSpinnerService, private toastr: ToastrService) {
   // MEDICINE FORM ERRORS
    this.medicineFormErrors = {
      medicineId: {},
      name: {},
      form: {},
      rxname: {},
      description: {},
      manufacturer: {},
      drugtype: {},
      condition: {},
      precaution: {},
      direction: {},
      strength: {},
      unit: {},
      quantity: {},
      substitute: {},
      gstrate: {}
    }
    //MANUFACTURE FORM ERRORS
    this.manufactureFormerrors={
        gstin: {},
        name: {},
        contactName: {},
        contactNumber: {},
        street: {},
        city: {},
        country: {},
        zipcode: {},
        
  }
}

  ngOnInit() {
    this.medicineForm = this.createMedicineForm()

    this.medicineForm.valueChanges.subscribe(() => {
      this.onMedicineFormValuesChanged();
    });
  }
  // IT CATCHES ALL CHANGES IN FORM
  onMedicineFormValuesChanged() {
    for (const field in this.medicineFormErrors) {
      if (!this.medicineFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.medicineFormErrors[field] = {};
      // Get the control
      const control = this.medicineForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.medicineFormErrors[field] = control.errors;
      }
    }
  }
  // MEDICINE FORM
  createMedicineForm() {
    return this.formBuilder.group({
      medicineId: ['', Validators.required],
      name: ['', Validators.required],
      form:['', Validators.required],
      rxname: ['', Validators.required],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      drugtype: ['', Validators.required],
      condition: ['', Validators.required],
      precaution: ['', Validators.required],
      direction: ['', Validators.required],
      strength: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      substitute: ['', Validators.required],
      gstrate: ['', Validators.required],
    });
  }
  //SAVE MEDICINE FORM
  saveMedicineForm(){
    console.log(this.medicineForm.value)
    if(this.medicineForm.valid){

      this.medicineForm.reset();    //AFTER SUBMIT OR CANCEL FOEM WILL BE RESET
    }
    else{
this.showError();
this.medicineForm.reset();
    }
  }
saveManufactureForm(){
  console.log(this.manuactureForm.value)
  if(this.manuactureForm.valid){

  }
  else{
    this.showError();
  }
}
 
 // SHOW  TOAST NOTIFICTATION,
 showError() {
  this.toastr.error(' Form not created!', 'Major Error', {
  });
}
  //SHOW TOAST NOTIFICATION
  showSuccess() {
    this.toastr.success('Medicine form created!', 'Toastr fun!', {
    });
  }
}
