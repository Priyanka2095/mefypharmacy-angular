import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../services/medicine.service'
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;


@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  drugtypeForm: FormGroup;
  medicineForm: FormGroup;
  manuactureForm: FormGroup
  medicineFormErrors: any;
  drugtypeFormErrors: any;
  manufactureFormerrors: any
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  drugList: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private medicineService: MedicineService, private spinner: NgxSpinnerService, private toastr: ToastrService) {

    /************DRUG TYPE FORM ERRORS***************/
    this.drugtypeFormErrors = {
      type: {},
      description: {},
    };
    /***********************MEDICINE FORM ERRORS******************/
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
    /*************************MANUFACTURE FORM ERRORS********************/
    this.manufactureFormerrors = {
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
    /***************************DRUG TYPE*****************/
    this.drugtypeForm = this.Drugform()

    this.drugtypeForm.valueChanges.subscribe(() => {
      this.onDrugFormValuesChanged();
    });

    /******************************MEDICINE FORM***********************/
    this.medicineForm = this.createMedicineForm()

    this.medicineForm.valueChanges.subscribe(() => {
      this.onMedicineFormValuesChanged();
    })

    /****************************************MANUFACTURE FORM*******************/
    this.manuactureForm = this.createManufactureForm()

    this.medicineForm.valueChanges.subscribe(() => {
      this.onManufactureFormValuesChanged();
    })

    this.getAllDrug();
  }
  /********************************* IT CATCHES ALL CHANGES IN DRUG FORM**************************/
  onDrugFormValuesChanged() {
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
  /**************************** IT CATCHES ALL CHANGES IN MEDICINE FORM*******************/
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
  /**********************************IT CATCHES ALL CHANGES IN MASNUFACTURE FORM */
  onManufactureFormValuesChanged() {
    for (const field in this.manufactureFormerrors) {
      if (!this.manufactureFormerrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.manufactureFormerrors[field] = {};
      // Get the control
      const control = this.manuactureForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.manufactureFormerrors[field] = control.errors;
      }
    }
  }

  // DRUG FORM
  Drugform() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /********************************** MEDICINE FORM********************/
  createMedicineForm() {
    return this.formBuilder.group({
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
  /********************************** MANUFACTURE FORM********************/
  createManufactureForm() {
    return this.formBuilder.group({
      gstin: ['', Validators.required],
      name: ['', Validators.required],
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }
  /*************************SAVE DRUG FORM************************************/
  saveDrugForm() {
    console.log("drugformvalue", this.drugtypeForm.value);
    if (this.drugtypeForm.valid) {
      $('#myModal').modal('hide');
      let data = {
        type: this.drugtypeForm.value.type,
        description: this.drugtypeForm.value.description
      }
      this.medicineService.createdrug(data).subscribe(value => {
        console.log(value);
        this.drugtypeForm.reset();
        this.toastr.success(' Drug Form created!', 'Toastr fun!')
      }, err => {
        console.log(err);
        this.toastr.error('Manufacture Form not created!', 'Major Error')
      })
      
    }
    else {
      this.drugtypeForm.reset();
      this.toastr.error('Drug Form not created!', 'Major Error')
    }
  }
  /****************************SAVE MEDICINE FORM***************************/
  saveMedicineForm() {
    this.submitted=true
    if (this.medicineForm.valid) {
      console.log(this.medicineForm.value) 
      this.spinner.show(); /**SHOW LOADER */  
      let data={
        name: this.medicineForm.value.name,
        form: this.medicineForm.value.form,
        rxname: this.medicineForm.value.rxname,
        description: this.medicineForm.value.description,
        manufacturer: this.medicineForm.value.manufacturer,
        drugtype: this.medicineForm.value.drugtype,
        condition: this.medicineForm.value.condition,
        precaution: this.medicineForm.value.precaution,
        direction: this.medicineForm.value.direction,
        strength: this.medicineForm.value.strength,
        unit: this.medicineForm.value.unit,
        quantity: this.medicineForm.value.quantity,
        substitute: this.medicineForm.value.substitute,
        gstrate: this.medicineForm.value.gstrate,
        medicineId:""
      }
      console.log(data)
      this.medicineService.createMedicineMaster(data).subscribe(value=>{
      console.log(value)
       $('#myModal').modal('hide');
       this.spinner.hide(); /**HIDE LOADER */
       this.toastr.success(' Medicine Form created!', 'Toastr fun!')
      this.medicineForm.reset();  //AFTER SUBMIT OR CANCEL FORM WILL BE RESET
      },
    err=>{
      console.log(err)
      this.toastr.error('Medicine Form not created!', 'Major Error')
    })
    }
    else {
      // this.medicineForm.reset();
      this.toastr.error('Manufacture Form not created!', 'Major Error')
    }
  }
  /********************************SAVE MANUFACTURE FORM*********************/
  saveManufactureForm() {
    console.log(this.manuactureForm.value)
    this.submitted=true
    if (this.manuactureForm.valid) {
      this.spinner.show(); /**SHOW LOADER */
      let data={
        gstin: this.manuactureForm.value.gstin,
        name: this.manuactureForm.value.name,
        contactName: this.manuactureForm.value.contactName,
        contactNumber: this.manuactureForm.value.contactNumber,
       address:{
        street: this.manuactureForm.value.street,
        city: this.manuactureForm.value.city,
        country: this.manuactureForm.value.country,
        zipcode:this.manuactureForm.value.zipcode
       }
      }
   this.medicineService.createManufacture(data).subscribe(value=>{
     console.log(value);
     $('#myModal4').modal('hide');/**AFTER SUBMIT MODAL WILL CLOSE */
     this.submitted=false
     this.spinner.hide(); /**HIDE LOADER */
     this.manuactureForm.reset();
       /****************************SHOW  TOAST NOTIFICTATION*********************/
     this.toastr.success(' Manufacture Form created!', 'Toastr fun!')
   },
  err=>{
    console.log(err)
    /*********************************SHOW TOAST NOTIFICATION******************/
    this.toastr.error('Manufacture Form not created!', 'Major Error')
  })
      
    }
    else {
      $('#myModal4').modal('show');
      // this.submitted=false
      // this.toastr.error('Manufacture Form not created!', 'Major Error')
    }
    // this.manuactureForm.reset();

  }

  /*****************GET ALL DRUG TYPE****************/
  getAllDrug() {
    this.medicineService.getDrugType().subscribe(data => {
      console.log(data);
      let value: any = {}
      value = data;
      this.drugList = value
    })
  }

}



