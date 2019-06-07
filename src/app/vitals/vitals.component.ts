import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {
  vitals_data; patientdata_details; savedata; acess_rights;
  addvital_btn; editvital_btn;
  constructor(private http: HttpClient, private GlobalService: GlobalService, private router: Router, ) { }
  datevalidation;
  ngOnInit() {
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));

    this.get_vital_patient(this.patientdata_details);
    this.vitals_data = {};
    // this.GlobalService.get_access_rights_activity();
    // console.log(this.GlobalService.user_access_rights);
    // this.acess_rights = this.GlobalService.user_access_rights;
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
  }
  get_vital_patient(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    let count = 0;
    let chklength = 0;
    if (patientdata_details) {
      
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail', patientdata_details).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          let resData = [{}];
          this.vitals_data.Formvalue = [];
          this.vitals_data.medication = [];
          this.vitals_data.allergy = [];
        this.vitals_data.Formvalue = resdata['ResponseObject'];
          for(let j=0;j<this.vitals_data.Formvalue.length;j++){
            chklength++;
            if(chklength == 13){
              resData.push({});
              chklength = 0;
              count++;
            }
                         
            resData[count][this.vitals_data.Formvalue[j].name] = this.vitals_data.Formvalue[j].value;
          }
          this.vitals_data.Formvalue = resData;
          
          // this.addvital_btn = false;
          // this.editvital_btn = true;
          if(this.GlobalService.viewPatientListPage === false && this.vitals_data.Formvalue.length >0) {
            this.addvital_btn = false;
            this.editvital_btn = true;
          } else {
                this.addvital_btn = true;
                this.editvital_btn = false;
          }
          this.GlobalService.disableloader();
          this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getallergydetail', patientdata_details).subscribe(resdata => {
            if (resdata['IsSuccess']) {
              this.vitals_data.allergy = resdata['ResponseObject'];
              for(let i=0;i<this.vitals_data.allergy.length;i++){
                if(this.vitals_data.allergy[i].notes != ''){
                  this.vitals_data.allergy[i].notes = JSON.parse(this.vitals_data.allergy[i].notes);
                }
              }
              this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getactmedicationdetail', patientdata_details).subscribe(resdata => {
                if (resdata['IsSuccess']) {
                  this.vitals_data.medication = resdata['ResponseObject'][0].tvs_nxt_form_trimed;
                  this.vitals_data.medication = JSON.parse(this.vitals_data.medication)
                  this.GlobalService.showontop.next(this.vitals_data);
                }
              })
            }
          })          

        } else {
          this.vitals_data = "";
          this.addvital_btn = true;
          this.editvital_btn = false;
          // document.getElementById('addvital_btn').style.visibility = 'visible';
          // document.getElementById('editvital_btn').style.display = 'none';
          this.GlobalService.disableloader();
        }
      })
    }
  }


  // vital_details() {
  //   this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail').subscribe(resdata => {
  //     if (resdata['IsSuccess']) {
  //       sessionStorage.setItem('vital_details_session', JSON.stringify(resdata['ResponseObject']));
  //       var vital_details_cc = JSON.parse(sessionStorage.getItem('vital_details_session'));
  //       this.vitals_data_new = vital_details_cc;
  //       console.log(this.vitals_data_new);
  //     }
  //   })
  // }
  edit_vitals(data_edit) {
    if (data_edit.Formvalue) {
      for (var i = 0; i < data_edit.Formvalue.length; i++) {
        if (data_edit.Formvalue[i].height_status == "1") {
          data_edit.Formvalue[i].height_status = true;
        } else {
          data_edit.Formvalue[i].height_status = false;
        }
        if (data_edit.Formvalue[i].weight_status == "1") {
          data_edit.Formvalue[i].weight_status = true;
        } else {
          data_edit.Formvalue[i].weight_status = false;
        }
        if (data_edit.Formvalue[i].pulse_status == "1") {
          data_edit.Formvalue[i].pulse_status = true;
        } else {
          data_edit.Formvalue[i].pulse_status = false;
        }
        if (data_edit.Formvalue[i].temperature_status == "1") {
          data_edit.Formvalue[i].temperature_status = true;
        } else {
          data_edit.Formvalue[i].temperature_status = false;
        }
        if (data_edit.Formvalue[i].respiratory_status == "1") {
          data_edit.Formvalue[i].respiratory_status = true;
        } else {
          data_edit.Formvalue[i].respiratory_status = false;
        }
        if (data_edit.Formvalue[i].bp_syaytolic_status == "1") {
          data_edit.Formvalue[i].bp_syaytolic_status = true;
        } else {
          data_edit.Formvalue[i].bp_syaytolic_status = false;
        }
        if (data_edit.Formvalue[i].bp_diastolic_status == "1") {
          data_edit.Formvalue[i].bp_diastolic_status = true;
        } else {
          data_edit.Formvalue[i].bp_diastolic_status = false;
        }
        if (data_edit.Formvalue[i].bmi_status == "1") {
          data_edit.Formvalue[i].bmi_status = true;
        } else {
          data_edit.Formvalue[i].bmi_status = false;
        }
        if (data_edit.Formvalue[i].bsa_status == "1") {
          data_edit.Formvalue[i].bsa_status = true;
        } else {
          data_edit.Formvalue[i].bsa_status = false;
        }
        if (data_edit.Formvalue[i].notes_status == "1") {
          data_edit.Formvalue[i].notes_status = true;
        } else {
          data_edit.Formvalue[i].notes_status = false;
        }
        if (data_edit.Formvalue[i].allergy_status == "1") {
          data_edit.Formvalue[i].allergy_status = true;
        } else {
          data_edit.Formvalue[i].allergy_status = false;
        }

      }
    }
    debugger;
    sessionStorage.setItem("vitals_details_edit", JSON.stringify(data_edit));
    this.router.navigate(['/Homescreen/Patientdetails/Editvitals']);
  }


}
