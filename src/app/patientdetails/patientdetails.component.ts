import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})
export class PatientdetailsComponent implements OnInit {
  // debugger;
  acess_rights;
  patient_details; vitals_data_new; vital_details_cc;vitals_data;viewBtn;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute , private GlobalService: GlobalService) { }

  ngOnInit() {
    // this.route.data.forEach((data) =>{
    //   console.log(data)
    //   this.viewLink = data.key == 'Inpatient List' ? true : false;
    // })
    this.GlobalService.getPatientType().subscribe(res =>{
      this.GlobalService.viewPatientListPage = res === 'inPatientList' ? true : false;
    })
    // this.route.queryParams.subscribe(params =>{
    //       this.viewBtn = params['prepage'] === 'inpatient' ? true : false;
    // })
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    console.log(this.acess_rights);
    
    this.GlobalService.showontop
      .subscribe(res => this.vitals_data = res);

    this.patient_details = JSON.parse(sessionStorage.getItem('patientdata'));
    console.log(this.patient_details);
    // console.log('dasd');
    // this.vital_details();
    this.get_vital_patient(this.patient_details);
    this.vitals_data_new = {};
    this.vitals_data = {};
  }

  get_vital_patient(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    if (patientdata_details) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail', patientdata_details).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.vitals_data = resdata['ResponseObject'];
        } else {
          this.GlobalService.disableloader();
        }
      })
    }
  }
  
}
