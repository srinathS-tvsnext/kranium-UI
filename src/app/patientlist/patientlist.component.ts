import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css'],

})


export class PatientlistComponent implements OnInit {

  socialmentions; bodytobind = []; datecc; tomorrow; datetobinds; pat_profile; vitals_data; consodated_arraay; login_name;
  filterd_data; filtered_data; totalcounts_walk; totalcounts_app; totalcounts_comp; check_d_date;
  superadmin_details; DoctorsName; hidden_doc;doctor;
  constructor(private detectchnge: ChangeDetectorRef, private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  totalcount; totalcounts;cur_date_format;config;showPagi


  ngOnInit() {
    // superadmin select doctor
    this.superadmin_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.superadmin_details);
    if (this.superadmin_details[0].User_ID == 'superadmin') {
      this.hidden_doc = false;
    } else {
      this.hidden_doc = true;
    }
    // end superadmin select doctor

    var cccc_dd = new Date();
    var dataes = ("0" + cccc_dd.getDate()).slice(-2);
    var months = ("0" + (cccc_dd.getMonth() + 1)).slice(-2);
    var years = cccc_dd.getFullYear();
    this.check_d_date = years + "-" + months + "-" + dataes;

    this.filtered_data = [];
    this.datecc = new Date();
    console.log(this.datecc);
    var date = this.datecc;
    this.f(this.datecc);
    this.get_DoctorsName();

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.filtered_data.length
    };

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  refresh() {
    this.doctor={};
    this.datecc = new Date();
    console.log(this.datecc);
    var date = this.datecc;
    this.f(this.datecc);
  }


  nextdate(datecc) {
    debugger;
    var tomorrow = new Date(datecc);
    tomorrow.setDate(tomorrow.getDate() + 7);
    this.datecc = tomorrow;
    console.log(this.datecc);
    this.f(this.datecc);
  }

  prevdate(datecc) {
    debugger;
    var tomorrow = new Date(datecc);
    tomorrow.setDate(tomorrow.getDate() - 7);
    this.datecc = tomorrow;
    console.log(this.datecc);
    this.f(this.datecc)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  f(data) {
    this.doctor={};
    this.bodytobind = [];
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var curr = data;
    console.log(curr);
    var first = curr.getDate() - curr.getDay();
    var currdate = curr.getDate();
    var currday = curr.getDay(); // get current date
    for (var i = 0; i <= 6; i++) {
      var tomorrowdd = new Date(data);
      tomorrowdd.setDate(first + i);
      debugger;
      if (currdate == tomorrowdd.getDate()) {
        var active = 'active';
        this.get_appointments_byday(curr);
      } else {
        var active = '';
      }
      this.bodytobind.push({ day: days[tomorrowdd.getDay()], date: tomorrowdd.getDate(), active: active });
    }
    console.log(this.bodytobind);
  }

  highlighted(date) {
    this.doctor={};
    this.filtered_data = [];
    debugger;
    if (date) {
      this.GlobalService.enableloader();
      var tomorrow = new Date();
      tomorrow.setDate(date);
      this.datecc = tomorrow;
      var datae = ("0" + this.datecc.getDate()).slice(-2);
      var month = ("0" + (this.datecc.getMonth() + 1)).slice(-2);
      var year = this.datecc.getFullYear();
      var new_consilated_date = year + "-" + month + "-" + datae;
      if (new_consilated_date) {
        this.login_name = JSON.parse(sessionStorage.getItem('logindata'));
        this.consodated_arraay = { 'logindata': this.login_name, date: new_consilated_date };

        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_appointments', this.consodated_arraay).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            console.log(resdata['ResponseObject']);
            this.socialmentions = resdata['ResponseObject'];
            if (this.socialmentions) {
              for (var i = 0; i < this.socialmentions.length; i++) {
                if (new_consilated_date < this.check_d_date) {
                  this.socialmentions[i].appt_status = "done";
                  this.socialmentions[i].Previousdate = true;
                } else {
                  this.socialmentions[i].Previousdate = false;
                }
              }
            }
            this.filterd_data = resdata['ResponseObject'];
            this.get_awalkin_byday("walkin");
            this.get_awalkin_byday("appointment");
            this.get_awalkin_byday("done");
            this.get_awalkin_byday("ALL");
          } else {
            this.GlobalService.disableloader();
            this.socialmentions = [];
            this.filtered_data = [];
            this.totalcount = 0;
            this.totalcounts_walk = 0; this.totalcounts_app = 0; this.totalcounts_comp = 0;
            this.openSnackBar("No Appointments Found in this Date", "Close");
          }
        })
      }
      for (var k = 0; k < this.bodytobind.length; k++) {
        if (date == this.bodytobind[k]['date']) {
          this.bodytobind[k].active = 'active';
        } else {
          this.bodytobind[k].active = '';
        }
      }
    } else {
      var active = '';
    }
    this.showPagi = this.filtered_data.length == 0 ? false : true;
  }

  filterfunction() {
    debugger;

  }

  get_appointments_byday(curr_date) {
    debugger;
    console.log(curr_date);
    var consilated_date = "";
    this.GlobalService.enableloader();
    if (curr_date) {
      var datae = ("0" + curr_date.getDate()).slice(-2);
      var month = ("0" + (curr_date.getMonth() + 1)).slice(-2);
      var year = curr_date.getFullYear();
      consilated_date = year + "-" + month + "-" + datae;
      console.log(consilated_date);
      this.cur_date_format = year + "-" + month + "-" + datae;;

      this.login_name = JSON.parse(sessionStorage.getItem('logindata'));
      this.consodated_arraay = { 'logindata': this.login_name, date: consilated_date };

      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_appointments', this.consodated_arraay).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {

          console.log(resdata['ResponseObject']);
          this.socialmentions = resdata['ResponseObject'];
          if (this.socialmentions) {
            for (var i = 0; i < this.socialmentions.length; i++) {
              if (consilated_date < this.check_d_date) {
                this.socialmentions[i].appt_status = "done";
                this.socialmentions[i].Previousdate = true;
                this.socialmentions[i].nowdate = false;
              } else if (consilated_date == this.check_d_date) {
                this.socialmentions[i].Previousdate = false;
                this.socialmentions[i].nowdate = true;
              }
            }
          }
          this.filtered_data = resdata['ResponseObject'];
          this.get_awalkin_byday("walkin");
          this.get_awalkin_byday("appointment");
          this.get_awalkin_byday("done");
          this.get_awalkin_byday("ALL");
          this.GlobalService.disableloader();
        } else {
          this.GlobalService.disableloader();
          this.socialmentions = [];
          this.filtered_data = [];
          this.totalcount = 0;
          this.totalcounts_walk = 0; this.totalcounts_app = 0; this.totalcounts_comp = 0;
          this.openSnackBar("No Appointments Found in this Date", "Close");
        }        
      })
    }
  }


  get_awalkin_byday(data_fil) {
    if (!this.socialmentions)
      return false;
    if (data_fil == "ALL") {
      this.filtered_data = [];
      this.filtered_data = this.socialmentions;
      if (this.filtered_data.length != 0) {
        this.totalcount = this.filtered_data.length;
      } else {
        this.totalcount = 0;
      }
    }
    if (data_fil == "walkin") {
      this.filtered_data = [];
      debugger;
      for (var i = 0; i < this.socialmentions.length; i++) {
        if (this.socialmentions[i].appt_status == "walkin") {
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_walk = this.filtered_data.length;
      } else {
        this.totalcounts_walk = 0;
      }
    }
    if (data_fil == "appointment") {
      this.filtered_data = [];
      for (var i = 0; i < this.socialmentions.length; i++) {
        if (this.socialmentions[i].appt_status == "pending" || this.socialmentions[i].appt_status == "checkedin" || this.socialmentions[i].appt_status == "Followup") {
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_app = this.filtered_data.length;
      } else {
        this.totalcounts_app = 0;
      }
    }
    if (data_fil == "done") {
      this.filtered_data = [];
      for (var i = 0; i < this.socialmentions.length; i++) {
        if (this.socialmentions[i].appt_status == "done") {
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_comp = this.filtered_data.length;
      } else {
        this.totalcounts_comp = 0;
      }
    }
    this.showPagi = this.filtered_data.length == 0 ? false : true;
    this.detectchnge.detectChanges();
  }


  patientlist_detail(patien_data) {
    debugger;
    console.log(patien_data);
    this.GlobalService.enableloader();
    console.log(patien_data.appt_status);
    sessionStorage.setItem('datestatus', JSON.stringify(patien_data));
    // get_patientprofile
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_patientprofile', patien_data).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.pat_profile = resdata['ResponseObject'];
            sessionStorage.setItem('patientdata', JSON.stringify(resdata['ResponseObject']));
            this.router.navigate(['/Homescreen/Patientdetails/summary/']);
          } else {
            this.GlobalService.disableloader();
            this.pat_profile = [];
            this.openSnackBar("No Patient Found", "Close");
          }
          
        })
  }

  vital_details() {
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.vitals_data = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
        this.vitals_data = [];
        this.openSnackBar("Error: No Related Data Found", "Close");
      }
    })
  }

  changedoctor_appointment(data) {
    this.GlobalService.enableloader();
    var select_doc = [{ User_name: data.name, nr: data.personell_nr, User_ID: data.login_id, status: data.STATUS,tdy_date: this.cur_date_format}];
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/changedoctor_appointments', select_doc).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.filtered_data = resdata['ResponseObject'];
      } else {
        this.filtered_data=[];
        this.GlobalService.disableloader();
        this.openSnackBar("No Appointments Found in this Date", "Close");
      }
    })
  }

  get_DoctorsName() {
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      if (resdata) {
        this.DoctorsName = resdata['ResponseObject'];
      } else {
      }
    });
  }



  old_patientlist_detail(patien_data) {
    debugger;
    console.log(patien_data);
    console.log(patien_data.appt_status);
    // get_patientprofile
    sessionStorage.setItem('datestatus', JSON.stringify(patien_data));
      debugger;
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_pastencounterdetail', patien_data).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.pat_profile = resdata['ResponseObject'];
            sessionStorage.setItem('patientdata', JSON.stringify(resdata['ResponseObject']));
            this.router.navigate(['/Homescreen/Patientdetails/summary']);
          } else {
            this.GlobalService.disableloader();
            this.pat_profile = [];
            this.openSnackBar("No Patient Found", "Close");
          }
          
        })

  }
  clickOnPatient(patientDetail){
    this.GlobalService.savePatientType('outPatientList');
    if(patientDetail.appt_status=== 'checkedin' || patientDetail.appt_status=== 'walkin'){
      this.patientlist_detail(patientDetail);
    }
    if( patientDetail.appt_status=== 'done'){
      patientDetail.Previousdate ? this.old_patientlist_detail(patientDetail) : this.patientlist_detail(patientDetail);
    }
  }
}
