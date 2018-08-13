import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService} from '../services/medicine.service'
import { SharedService } from '../services/shared.service';
declare var $: any;


@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  drugtypeForm: FormGroup;
  type: any;
  drugtypeFormErrors: any;
  medicineForm: FormGroup;
  medicineFormErrors: any;
  submitted: boolean = false;  //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  constructor(private formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private medicineService: MedicineService ) {
    //DRUG TYPE FORM ERRORS
    this.drugtypeFormErrors = {
      type: {},
      description: {},
    };
    //MEDICINE FORM ERRORS
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
  }
  ngOnInit() {
    //DRUG TYPE
    this.drugtypeForm = this.drugform()

    this.drugtypeForm.valueChanges.subscribe(() => {
      this.onPharmacyFormValuesChanged();
    });
    //MEDICINE FORM 
    this.medicineForm = this.createMedicineForm()

    this.medicineForm.valueChanges.subscribe(() => {
      this.onMedicineFormValuesChanged();
    })
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
  createMedicineForm() {
    return this.formBuilder.group({
      medicineId: ['', Validators.required],
      name: ['', Validators.required],
      form: ['', Validators.required],
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


  // IT CATCHES ALL CHANGES IN FORM
  onPharmacyFormValuesChanged() {
    for (const field in this.drugtypeFormErrors) {
      if (!this.drugtypeFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.drugtypeFormErrors[field] = {};
      // Get the control
      const control = this.drugtypeForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.drugtypeFormErrors[field] = control.errors;
      }
    }
  }
  drugform() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  submitform() {
 console.log(this.drugtypeForm.value)
    this.submitted = true;
    console.log("drugformvalue", this.drugtypeForm.value);
    $('#myModal').modal('hide');
let data={
  type:this.drugtypeForm.value.type,
  description:this.drugtypeForm.value.description
}
    this.medicineService.drugdesc(data).subscribe(value=>{
      console.log(value);
    })
}
}
