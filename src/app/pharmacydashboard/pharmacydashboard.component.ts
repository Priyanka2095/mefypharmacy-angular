import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
import { MedicineService } from '../services/medicine.service'
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// import { TypeaheadModule } from 'ngx-bootstrap'; // for auto complete

declare var $: any;


@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {


  p: number = 1;
  vendorpage: number = 1;
  medicineMasterPage: number = 1;
  manufacturePage: number = 1;
  pharmacyPage: number = 1;
  collection: any[];
  drugtypeForm: FormGroup;
  medicineForm: FormGroup;
  manuactureForm: FormGroup;
  vendorForm: FormGroup;
  pharmacyItemForm: FormGroup;
  pharmacyItemFormErrors: any;
  medicineFormErrors: any;
  drugtypeFormErrors: any;
  manufactureFormerrors: any
  vendorFormerrors: any;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  noDrugResult = false;
  noManufactureResult = false
  noSupplierResult = false
  drugList: any = [];
  manufacturerList: any = [];
  vendorList: any = [];
  selectedPharmacyId: any
  pharmaData: any = {}
  drugTypeId: any
  selectedMedicineId: any;
  manufactureGstin: any;
  public mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Phone number validation 
  drugtypeList: any = [];
  substitution: any = [];
  arrayOfObjects: any = [];
  medicineList: any = [];
  manuactureList: any = []
  pharmacyItemList: any = []
  substituteList: any = [];


  constructor(private formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, private medicineService: MedicineService, private spinner: NgxSpinnerService, private toastr: ToastrService, public pharmacyService: PharmacyService) {
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
    /*************************************PHARMACY ITEM FORM**********************/
    this.pharmacyItemFormErrors = {
      safetyStock: {},
      minMax: {},
      leadTime: {},
      binId: {},
      supplier: {},
      medicineId: {}
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
    /*************************VENDOR FORM ERRORS********************/
    this.vendorFormerrors = {
      name: {},
      gstin: {},
      street: {},
      city: {},
      country: {},
      zipcode: {},
      contactName: {},
      contactNumber: {},
    }
    this.selectedPharmacyId = localStorage.getItem('tradeId');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.selectedPharmacyId)
    if(this.selectedPharmacyId==null){
      this.router.navigate(['/pharmalist'])   /*IF PHARMACY IS NOT SELECTED THEN ,GO BACK TO PHARMACY LIST**/
    }
  }

  ngOnInit() {

    /***************************DRUG TYPE*****************/
    this.drugtypeForm = this.Drugform()

    this.drugtypeForm.valueChanges.subscribe(() => {
      this.onDrugFormValuesChanged();
    });
    /***************************VENDOR FORM*****************/
    this.vendorForm = this.createVendorForm()

    this.vendorForm.valueChanges.subscribe(() => {
      this.onVendorFormValuesChanged();
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
    /***************************PHARMACY ITEM FORM******************* */
    this.pharmacyItemForm = this.createPharmacyItemForm()

    this.pharmacyItemForm.valueChanges.subscribe(() => {
      this.onPharmacyFormValuesChanged();
    })

    this.getAllDrug();
    this.getPharmacyDetail();
    this.getAllVendor();
    this.getAllMedicine();
    this.getAllMedicine();
    this.getAllManufactureList();
    this.getPharmacyItemList();
   
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
  /**************************** IT CATCHES ALL CHANGES IN PHARMACY ITEM FORM  FORM*******************/
  onPharmacyFormValuesChanged() {
    for (const field in this.pharmacyItemFormErrors) {
      if (!this.pharmacyItemFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.pharmacyItemFormErrors[field] = {};
      // Get the control
      const control = this.pharmacyItemForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.pharmacyItemFormErrors[field] = control.errors;
      }
    }
  }
  /**********************************IT CATCHES ALL CHANGES IN MASNUFACTURE FORM*************/
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
  /**********************************IT CATCHES ALL CHANGES IN VENDOR FORM **************************/
  onVendorFormValuesChanged() {
    for (const field in this.vendorFormerrors) {
      if (!this.vendorFormerrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.vendorFormerrors[field] = {};
      // Get the control
      const control = this.vendorForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.vendorFormerrors[field] = control.errors;
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
  // *****************************CREATE VENDOR FORM*************************************
  createVendorForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      gstin: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.required],
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
      substitute: [''],
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
  /*********************************** PHARMACY ITEM FORM******************/
  createPharmacyItemForm() {
    return this.formBuilder.group({
      safetyStock: ['', Validators.required],
      minMax: ['', Validators.required],
      leadTime: ['', Validators.required],
      binId: ['', Validators.required],
      // pharmacyId: ['', Validators.required],
      medicineId: ['', Validators.required],
      supplier: ['', Validators.required],
    });
  }
  /*************************SAVE DRUG FORM************************************/
  saveDrugForm() {
    this.submitted = true
    console.log("drugformvalue", this.drugtypeForm.value);
    if (this.drugtypeForm.valid) {
      this.spinner.show(); /**SHOW LOADER */
      let data = {
        type: this.drugtypeForm.value.type,
        description: this.drugtypeForm.value.description
      }
      this.medicineService.createdrug(data).subscribe(value => {
        this.spinner.hide();
        this.drugtypeForm.reset();
        this.toastr.success(' Drug Form created!', 'Toastr fun!');
        this.spinner.hide();
        this.getAllDrug();
        this.submitted = false;
        $('#myModal').modal('hide');
      }, err => {
        console.log(err);
        this.submitted = false;
        this.spinner.hide();/**HIDE LOADER */
        this.toastr.error('Drug Form not created!', 'Server Issue')
      })

    }
    else {
      this.drugtypeForm.reset();
      this.spinner.hide();/**HIDE LOADER */
      this.toastr.error('Drug Form not created!', 'Invalid Details')
    }
    // this.drugtypeList.push(this.drugtypeForm.value);
    // console.log(this.drugtypeList);
  }
  /****************************SAVE MEDICINE FORM***************************/
  saveMedicineForm() {

    this.submitted = true
    console.log(this.medicineList);
    if (this.medicineForm.valid) {
      console.log(this.medicineForm.value)
      console.log(this.medicineForm.value.substitute)
      this.spinner.show(); /**SHOW LOADER */
      let data = {
        name: this.medicineForm.value.name,
        form: this.medicineForm.value.form,
        rxname: this.medicineForm.value.rxname,
        description: this.medicineForm.value.description,
        manufacturer: this.manufactureGstin,
        drugtype: this.drugTypeId,
        condition: this.medicineForm.value.condition,
        precaution: this.medicineForm.value.precaution,
        direction: this.medicineForm.value.direction,
        strength: this.medicineForm.value.strength,
        unit: this.medicineForm.value.unit,
        quantity: this.medicineForm.value.quantity,
        substitute: this.substituteList,
        gstrate: this.medicineForm.value.gstrate
      }
      console.log(data)
      this.medicineService.createMedicineMaster(data).subscribe(value => {
        console.log(value);
        this.spinner.hide(); /**HIDE LOADER */
        this.getAllMedicine();
        $('#myModal1').modal('hide');
        this.toastr.success(' Medicine Form created!', 'Toastr fun!')
        this.medicineForm.reset();  //AFTER SUBMIT OR CANCEL FORM WILL BE RESET
      },
        err => {
          console.log(err)
          this.toastr.error('Medicine Form not created!', 'Major Error')
          this.spinner.hide(); /**HIDE LOADER */
        })
    }
    else {
      // this.medicineForm.reset();
      this.spinner.hide(); /**HIDE LOADER */
      this.toastr.error('Manufacture Form not created!', 'Major Error')
    }
  }
  /********************************SAVE MANUFACTURE FORM*********************/
  saveManufactureForm() {
    console.log(this.manuactureForm.value)
    this.submitted = true
    if (this.manuactureForm.valid) {
      this.spinner.show(); /**SHOW LOADER */
      let data = {
        gstin: this.manuactureForm.value.gstin,
        name: this.manuactureForm.value.name,
        contactName: this.manuactureForm.value.contactName,
        contactNumber: this.manuactureForm.value.contactNumber,
        address: {
          street: this.manuactureForm.value.street,
          city: this.manuactureForm.value.city,
          country: this.manuactureForm.value.country,
          zipcode: this.manuactureForm.value.zipcode
        }
      }
      this.medicineService.createManufacture(data).subscribe(value => {
        console.log(value);
        this.spinner.hide(); /**HIDE LOADER */
        this.getAllManufactureList();
        $('#myModal4').modal('hide');/**AFTER SUBMIT MODAL WILL CLOSE */
        this.submitted = false
        this.manuactureForm.reset();
        /****************************SHOW  TOAST NOTIFICTATION*********************/
        this.toastr.success(' Manufacture Form created!', 'Toastr fun!');
      },
        err => {
          console.log(err)
          this.spinner.hide(); /**HIDE LOADER */
          /*********************************SHOW TOAST NOTIFICATION******************/
          this.toastr.error('Manufacture Form not created!', 'Major Error')
        })

    }
    else {
      $('#myModal4').modal('show');
      this.spinner.hide(); /**HIDE LOADER */
      // this.submitted=false
      // this.toastr.error('Manufacture Form not created!', 'Major Error')
    }
    // this.manuactureForm.reset();

  }
  /*********************CREATE PHARMACY ITEM***************************/
  savePharmacyItem() {
    this.submitted = false;
    if (this.pharmacyItemForm.valid) {
      this.spinner.show(); /**SHOW LOADER */
      let data = {
        pharmacyId: this.selectedPharmacyId,
        safetyStock: this.pharmacyItemForm.value.safetyStock,
        minMax: this.pharmacyItemForm.value.minMax,
        leadTime: this.pharmacyItemForm.value.leadTime,
        binId: this.pharmacyItemForm.value.binId,
        supplier: this.pharmacyItemForm.value.supplier,
        medicineId: this.selectedMedicineId
      }
      console.log(data)
      this.medicineService.createPharmacyItem(data).subscribe(value => {
        this.spinner.hide(); /**Hide LOADER */
        console.log(value);
        this.getPharmacyItemList();
        $('#myModal3').modal('hide');/**AFTER SUBMIT MODAL WILL CLOSE */
        this.submitted = false
        this.manuactureForm.reset();
        /****************************SHOW  TOAST NOTIFICTATION*********************/
        this.toastr.success(' Pharmacy Item Form created!', 'Toastr fun!');
      },
        err => {
          console.log(err)
          this.toastr.error('Pharmacy item Form not created!', 'Major Error')
          this.spinner.hide(); /**Hide LOADER */
        })
    }
    else {
      $('#myModal3').modal('show');
      this.spinner.hide(); /**HIDE LOADER */
    }
  }
  /*********ON CLICK EVENT MODAL WILL CLOSE********************8 */
  closeModal() {
    this.submitted = false;
    this.manuactureForm.reset();
    this.medicineForm.reset();
    this.vendorForm.reset();
    this.drugtypeForm.reset();
    this.pharmacyItemForm.reset();
  }
  /*************************SAVE VENDOR FORM (start)************************************/
  saveVendorForm() {
    this.submitted = true;
    console.log("Vendorformvalue", this.vendorForm.value);
    if (this.vendorForm.valid) {

      this.spinner.show(); /**SHOW LOADER */
      let data = {
        name: this.vendorForm.value.name,
        gstin: this.vendorForm.value.gstin,
        contactName: this.vendorForm.value.contactName,
        contactNumber: this.vendorForm.value.contactNumber,
        address: {
          street: this.vendorForm.value.street,
          city: this.vendorForm.value.city,
          country: this.vendorForm.value.country,
          zipcode: this.vendorForm.value.zipcode
        }
      }
      this.medicineService.createVendor(data).subscribe(value => {
        $('#myModal5').modal('hide');
        this.toastr.success(' Vendor Form created!', 'Toastr fun!');
        this.vendorForm.reset();
        this.submitted = false;
        this.spinner.hide();/**HIDE LOADER */
        this.getAllVendor();

      }, err => {
        console.log(err);
        this.submitted = false;
        this.spinner.hide();/**HIDE LOADER */
        this.toastr.error('Vendor Form not created!', 'Major Error') /**SHOW  TOAST NOTIFICTATION**/
      })
    }
    else {
      this.vendorForm.reset();
      this.toastr.error('Vendor Form not created!', 'Major Error') /**SHOW  TOAST NOTIFICTATION**/
    }
  }
  /*************************SAVE VENDOR FORM (end)************************************/
 /*****************GET ALL DRUG TYPE****************/
 getAllDrug() {
  this.spinner.show();
  this.medicineService.getDrugType().subscribe(data => {
    this.spinner.hide();
    let value: any = {}
    value = data;
    this.drugList = value
    console.log(this.drugList);
  },
err=>{
  console.log(err)
})
}
/*****************GET ALL MEDICINE LIST****************/
getAllMedicine() {
  this.medicineService.getMedicine().subscribe(data => {
    let value: any = {}
    value = data;
    this.medicineList = value
    console.log(this.medicineList);
    for (var i = 0; i < this.medicineList.length; i++) {
      var datamed = {
        medicineName: this.medicineList[i].name,
        medId: this.medicineList[i].medicineId

        }
        this.arrayOfObjects.push(datamed);
        console.log(this.arrayOfObjects);
      }
    },
    err=>{
      console.log(err)
    })
    }
/*****************GET ALL VENDOR ****************/
getAllVendor() {
  this.spinner.show();
  this.medicineService.getVendorType().subscribe(data => {
    let value: any = {}
    value = data;
    this.vendorList = value
    console.log(this.vendorList);
    this.spinner.hide();
  })
}
  /*************************GET PHARMACY DETAIL THROUGH API CALL*************************/
  getPharmacyDetail() {
    this.spinner.show(); /**SHOW LOADER */
    console.log("show spinner");
    this.medicineService.getPharmacy(this.selectedPharmacyId).subscribe(result => {
      console.log(result);
      let value: any = {}
      value = result
      this.pharmaData = value
      console.log("hide spinner");
      this.spinner.hide(); /**HIDE LOADER */
    },
  err=>{
   console.log(err)
  })
  }

  /***********************************GET MANUFACTURE LIST******************/
  getAllManufactureList() {
    this.spinner.show();
    this.medicineService.getManufactureList().subscribe(value => {
      console.log(value);
      let result: any = {};
      result = value;
      this.manuactureList = result;
      this.spinner.hide();
    },
  err=>{
    console.log(err)
  })
  }
  /*******************************GET PHARMACY ITEM LIST******************/
  getPharmacyItemList() {
    this.spinner.show()
    this.medicineService.getAllPharmacyItemList().subscribe(value => {
      let result: any = {}
      result = value
      this.pharmacyItemList = result
      console.log(this.pharmacyItemList)
      this.spinner.hide()
    },
  err=>{
    console.log(err)
    this.spinner.hide()
  })
  }
  /**************************CLEAR LOCAL STORAGE**********************/
  logout() {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('tradeId');
    this.router.navigate(['/login'])
    console.log('hey')
  }

  /** manufactuerer ON SELECT IN MEDICINE FORM **/
  manufacturerOnSelect(evt) {
    console.log(evt.item);
    this.manufactureGstin = evt.item.gstin
    console.log(this.manufactureGstin)    /*drug type Id*/

  }

  /** drug type on select in MEDICINE FORM **/
  drugtypeOnSelect(evt) {
    console.log(evt.item);
    this.drugTypeId = evt.item.typeId
    console.log(this.drugTypeId)  /*manufacture gistin*/

  }

  /** get medicine master **/
  getMedicineMaster() {
    this.getAllMedicine();
    this.getAllDrug();
    this.getAllManufactureList();
  }
  /**************ON SELECTED SUBSTITUE MEDICINE IN MEDICINE FORM****************************** */
  onSubstistueAdd(evt) {
    console.log(evt)
    console.log(this.medicineForm.value)
    this.substituteList.push(evt.medId)
  }
  /***********************MEDICINE ON SELECT IN PHARMACY FORM*********/
  onMedicineSelect(evt) {
    console.log(evt.item)
    this.selectedMedicineId = evt.item.medicineId
  }
  /***********************SUPPLIER ON SELECT IN PHARMACY FORM*********/
  onSupplierSelect(evt) {
    console.log(evt.item)
    this.pharmacyItemForm.value.supplier=evt.item.supplier
  }
  /**************IF RESULT IS NOT FOUND THEN SHOW MESSAGE */
  typeaheadNoDrugResults(event: boolean): void {
    this.noDrugResult = event;

  }
  /**************IF RESULT IS NOT FOUND THEN SHOW MESSAGE */
  typeaheadNoSupplierResults(event: boolean): void {
    this.noSupplierResult = event;

  }

  /**************IF RESULT IS NOT FOUND THEN SHOW MESSAGE */
  typeaheadNoManufactureResults(event: boolean): void {
    this.noManufactureResult = event
  }
}



