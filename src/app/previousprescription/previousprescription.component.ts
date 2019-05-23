import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-previousprescription',
  templateUrl: './previousprescription.component.html',
  styleUrls: ['./previousprescription.component.css']
})
export class PreviousprescriptionComponent implements OnInit {
  patientdata_details; pres_data;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.get_pres(this.patientdata_details);
  }

  get_pres(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_diagnosis_prescription_patient', patientdata_details).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.pres_data = resdata['ResponseObject'];
        // sessionStorage.setItem("previous_prescription", JSON.stringify(this.pres_data));
      } else {
        this.GlobalService.disableloader();
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }

  repaetr_presc(presData) {
    debugger;
    sessionStorage.setItem("previous_prescription", JSON.stringify(presData));
    // routerLink='/Homescreen/Patientdetails/Prescription'
    this.router.navigate(['/Homescreen/Patientdetails/Prescription']);
  }
}
