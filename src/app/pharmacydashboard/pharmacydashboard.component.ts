import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';
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
  p: number = 1;
  vendorpage: number = 1;
  medicineMasterPage:number=1;
  manufacturePage:number=1;
  pharmacyPage:number=1;
  collection: any[];
  drugtypeForm: FormGroup;
  medicineForm: FormGroup;
  manuactureForm: FormGroup;
  vendorForm: FormGroup;
  medicineFormErrors: any;
  drugtypeFormErrors: any;
  manufactureFormerrors: any
  vendorFormerrors: any;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  drugList: any = [];
  pharmacyId: any
  pharmaData: any = {}
  public mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] // Phone number validation 
  drugtypeList: any = [];
  vendorList: any = [];
  substitution: any = [];
  arrayOfObjects: any = [];
  medicineList:any = [];
  medicineMaster:any=[]
  manuactureList:any=[]
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
    this.pharmacyId = localStorage.getItem('tradeId');  // SET USER'S PHONENUMBER AS A ID FROM LOCALHOST
    console.log(this.pharmacyId)
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

    this.getAllDrug();
    this.getPharmacyDetail();
    this.getAllVendor();
    this.getAllMedicine();
    this.getAllMedicineMaster();
    this.getAllManufactureList();
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
        console.log(value);
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
        manufacturer: this.medicineForm.value.manufacturer,
        drugtype: this.medicineForm.value.drugtype,
        condition: this.medicineForm.value.condition,
        precaution: this.medicineForm.value.precaution,
        direction: this.medicineForm.value.direction,
        strength: this.medicineForm.value.strength,
        unit: this.medicineForm.value.unit,
        quantity: this.medicineForm.value.quantity,
        // substitute: this.medicineForm.value.substitute,
        gstrate: this.medicineForm.value.gstrate
      }
      console.log(data)
      this.medicineService.createMedicineMaster(data).subscribe(value => {
        console.log(value)
        this.getAllMedicineMaster();
        $('#myModal1').modal('hide');
        this.spinner.hide(); /**HIDE LOADER */
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
        this.getAllManufactureList();
        $('#myModal4').modal('hide');/**AFTER SUBMIT MODAL WILL CLOSE */
        this.submitted = false
        this.spinner.hide(); /**HIDE LOADER */
        this.manuactureForm.reset();
        /****************************SHOW  TOAST NOTIFICTATION*********************/
        this.toastr.success(' Manufacture Form created!', 'Toastr fun!')
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
  /*********ON CLICK EVENT MODAL WILL CLOSE********************8 */
  closeModal() {
    this.submitted = false;
    this.manuactureForm.reset();
    this.medicineForm.reset();
    this.vendorForm.reset();
    this.drugtypeForm.reset();
  }
  /*****************GET ALL DRUG TYPE****************/
  getAllDrug() {
    this.medicineService.getDrugType().subscribe(data => {
      //console.log(data);
      let value: any = {}
      value = data;
      this.drugList = value
      console.log(this.drugList);
    })
  }
    /*****************GET ALL MEDICINE LIST****************/
    getAllMedicine() {
      this.medicineService.getMedicine().subscribe(data => {
        let value: any = {}
        value = data;
        this.medicineList = value
        console.log(this.medicineList);
        for(var i=0; i<this.medicineList.length;i++){
          var datamed={
            medicinename:this.medicineList[i].name,
            medid:this.medicineList[i].medicineId
      
          }
          this.arrayOfObjects.push(datamed);
          console.log(this.arrayOfObjects);
        }
      })
    }
  /*****************GET ALL VENDOR ****************/
  getAllVendor() {
    this.medicineService.getVendorType().subscribe(data => {
      let value: any = {}
      value = data;
      this.vendorList = value
      console.log(this.vendorList);
    })
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
        console.log(value);
        $('#myModal5').modal('hide');
        this.toastr.success(' Vendor Form created!', 'Toastr fun!');
        this.vendorForm.reset();
        this.submitted = false;
        this.getAllVendor();
        this.spinner.hide();/**HIDE LOADER */

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

  /*************************GET PHARMACY DETAIL THROUGH API CALL*************************/
  getPharmacyDetail() {
    //this.spinner.show(); /**SHOW LOADER */
    this.medicineService.getPharmacy(this.pharmacyId).subscribe(result => {
      console.log(result);
      let value: any = {}
      value = result
      this.pharmaData = value
      this.spinner.hide(); /**HIDE LOADER */
    })
  }
  /******************************GET MEDICINE MASTER LIST****************** */
  getAllMedicineMaster(){
    this.medicineService.getMedicineMaster().subscribe(value=>{
      console.log(value)
      let result:any={}
      result=value
      this.medicineMaster=result
    })
  }
  /***********************************GET MANUFACTURE LIST******************/
  getAllManufactureList(){
    this.medicineService.getManufactureList().subscribe(value=>{
      console.log(value)
      let result:any={}
      result=value
      this.manuactureList=result
    })
  }
  // onItemSelectQualification(selected){

  //   if (selected) {
  //     if (this.qualification.includes(selected.title)) {
  //       this.qualifications = '';
  //       this.message = 'Qualification Already Exist !';
  //     }
  //     else {
  //       this.qualification.push(selected.title);
  //       this.messageNew ="";
  //       this.qualifications = '';
  //       this.messageQualification ="";

  //     }
  //   }
  findChoices(searchText: string) {
    return this.drugList.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}



