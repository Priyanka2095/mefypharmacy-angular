import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  medicineForm: FormGroup;
  medicineFormErrors: any;

  constructor(private sharedService: SharedService, private formBuilder: FormBuilder) {
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

}
