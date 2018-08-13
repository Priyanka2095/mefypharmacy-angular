import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  drugtypeForm: FormGroup;
  drugtype: any;
  drugtypeFormErrors: any;
  submitted: boolean = false;  //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.drugtypeFormErrors = {
      drugtype: {},
      description: {},
    };
  }
  ngOnInit() {
    this.drugtypeForm = this.drugform()
    this.drugtypeForm.valueChanges.subscribe(() => {
      this.onPharmacyFormValuesChanged();
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
      drugtype: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  submitform() {
    // if (this.drugtypeForm.value.drugtype != '' && this.drugtypeForm.value.description != '') {
      this.submitted = true;
      console.log("drugformvalue", this.drugtypeForm.value);
      // this.drugtypeForm.reset();
      $('#myModal').modal('hide');
      // this.router.navigate(['/pharmacydashboard']);
    // }
    // this.drugtypeForm.reset();    
  }
}
