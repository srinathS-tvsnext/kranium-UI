import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-inpatientlist',
  templateUrl: './inpatientlist.component.html',
  styleUrls: ['./inpatientlist.component.scss']
})
export class InpatientlistComponent implements OnInit {

  socialmentions; bodytobind = []; datecc; tomorrow; datetobinds; pat_profile; vitals_data; consodated_arraay; login_name;
  filterd_data; filtered_data; totalcounts_walk; totalcounts_app; totalcounts_comp; check_d_date;
  superadmin_details; DoctorsName; hidden_doc;doctor;

  constructor(private detectchnge: ChangeDetectorRef, private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  totalcount; totalcounts;cur_date_format;

  ngOnInit() {
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
    // this.get_awalkin_byday(this.datecc);
    // this.get_appointments_byday(this.datecc);
    // this.vital_details();
    // sessionStorage.removeItem('patientdata');
    this.get_DoctorsName(); 
  }

  f(data) {
    this.doctor={};
    // this.GlobalService.enableloader();
    this.bodytobind = [];
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var curr = data;
    console.log(curr);
    var first = curr.getDate() - curr.getDay();
    var currdate = curr.getDate();
    var currday = curr.getDay(); // get current date
    // this.bodytobind.push({ day: days[currday], date: currdate, active: 'active' });
    for (var i = 0; i <= 6; i++) {
      var tomorrowdd = new Date(data);
      tomorrowdd.setDate(first + i);
      debugger;
      if (currdate == tomorrowdd.getDate()) {
        var active = 'active';
        // var api_date = new Date(currdate);
        this.get_appointments_byday(curr);
        // this.get_awalkin_byday(curr);

      } else {
        var active = '';
      }
      this.bodytobind.push({ day: days[tomorrowdd.getDay()], date: tomorrowdd.getDate(), active: active });
    }
    console.log(this.bodytobind);
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
      this.consodated_arraay = { 'logindata': this.login_name };

      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_appointments_ip', this.consodated_arraay).subscribe(resdata => {
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
        // routerLink='/Homescreen/Patientlist'
      })
    }
  }

  get_awalkin_byday(data_fil) {
    // this.GlobalService.enableloader();
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
      // this.GlobalService.disableloader();
    }
    if (data_fil == "walkin") {
      this.filtered_data = [];
      debugger;
      for (var i = 0; i < this.socialmentions.length; i++) {
        if (this.socialmentions[i].appt_status == "walkin") {
          // this.socialmentions[i].Previousdate = true;
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_walk = this.filtered_data.length;
      } else {
        this.totalcounts_walk = 0;
      }
      // this.GlobalService.disableloader();
    }
    if (data_fil == "appointment") {
      this.filtered_data = [];
      for (var i = 0; i < this.socialmentions.length; i++) {
        // this.socialmentions[i].Previousdate = true;
        if (this.socialmentions[i].appt_status == "pending" || this.socialmentions[i].appt_status == "checkedin" || this.socialmentions[i].appt_status == "Followup") {
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_app = this.filtered_data.length;
      } else {
        this.totalcounts_app = 0;
      }
      // this.GlobalService.disableloader();
    }
    if (data_fil == "done") {
      this.filtered_data = [];
      for (var i = 0; i < this.socialmentions.length; i++) {
        if (this.socialmentions[i].appt_status == "done") {
          // this.socialmentions[i].Previousdate = true;
          this.filtered_data.push(this.socialmentions[i]);
        }
      }
      if (this.filtered_data.length != 0) {
        this.totalcounts_comp = this.filtered_data.length;
      } else {
        this.totalcounts_comp = 0;
      }
      // this.GlobalService.disableloader();
    }
    this.detectchnge.detectChanges();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_DoctorsName() {
    // this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      if (resdata) {
        // this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
      } else {
        // this.GlobalService.disableloader();
      }
    });
  }

  patientlist_detail(patien_data) {
    debugger;
    console.log(patien_data);
    this.GlobalService.enableloader();
    console.log(patien_data.appt_status);
    sessionStorage.setItem('datestatus', JSON.stringify(patien_data));
    // get_patientprofile
  //  if (patien_data.appt_status == 'checkedin' || patien_data.appt_status == 'done' || patien_data.appt_status == 'walkin') {
      debugger;
    //  if (patien_data.paid_status == 'paid') {
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_patientprofile', patien_data).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.pat_profile = resdata['ResponseObject'];
            sessionStorage.setItem('patientdata', JSON.stringify(resdata['ResponseObject']));
            this.router.navigate(['/Homescreen/Patientdetails/Opsummary/']);
          } else {
            this.GlobalService.disableloader();
            this.pat_profile = [];
            this.openSnackBar("No Patient Found", "Close");
          }
          // routerLink='/Homescreen/Patientlist'
          // routerLink='/Homescreen/Patientdetails/Past_Encounters/'
        })
    //   } else {
    //     this.GlobalService.disableloader();
    //     this.openSnackBar("Payment status is Notpaid", "Close");
    //   }
    // } else {
    //   this.GlobalService.disableloader();
    //   this.openSnackBar("Not allowed,Your Status is Pending", "Close");
    // }
  }

  refresh() {
    this.doctor={};
    this.datecc = new Date();
    this.f(this.datecc);
  }
  old_patientlist_detail(patien_data) {
    debugger;
    console.log(patien_data);
    console.log(patien_data.appt_status);
    // get_patientprofile
    sessionStorage.setItem('datestatus', JSON.stringify(patien_data));
    //if (patien_data.appt_status == 'checkedin' || patien_data.appt_status == 'done' || patien_data.appt_status == 'walkin') {
      debugger;
     // if (patien_data.paid_status == 'paid') {
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_pastencounterdetail', patien_data).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.pat_profile = resdata['ResponseObject'];
            sessionStorage.setItem('patientdata', JSON.stringify(resdata['ResponseObject']));
            this.router.navigate(['/Homescreen/Patientdetails/Opsummary/']);
          } else {
            this.GlobalService.disableloader();
            this.pat_profile = [];
            this.openSnackBar("No Patient Found", "Close");
          }
          // routerLink='/Homescreen/Patientlist'
          // routerLink='/Homescreen/Patientdetails/Past_Encounters/'
        })
      // } else {
      //   this.openSnackBar("Payment status is Notpaid", "Close");
      // }
    // } else {
    //   this.openSnackBar("Not allowed,Your Status is Pending", "Close");
    // }
  }
  clickOnPatient(patientDetail){
    this.GlobalService.savePatientType('inPatientList');
    //if(patientDetail.appt_status=== 'checkedin' || patientDetail.appt_status=== 'walkin'){
      this.patientlist_detail(patientDetail);
    //}
    // if( patientDetail.appt_status=== 'done'){
    //   patientDetail.Previousdate ? this.old_patientlist_detail(patientDetail) : this.patientlist_detail(patientDetail);
    // }
  }
}
