import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
pharmaData:any={};
  constructor(private sharedService: SharedService) {
    this.sharedService.pharmacyDetails.subscribe(data => {
      console.log(data);
      this.pharmaData=data;
    })
  }

  ngOnInit() {
  }

}





