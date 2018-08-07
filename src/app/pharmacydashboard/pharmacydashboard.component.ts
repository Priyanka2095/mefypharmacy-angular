import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {

  userData: any;
  constructor(private sharedService: SharedService) {

    this.sharedService.userNumber.subscribe(data => {
      console.log(data);
      this.userData = data;   // STORED LOGIN USER PHONENUMBER
    })
  }

  ngOnInit() {
  }

}
