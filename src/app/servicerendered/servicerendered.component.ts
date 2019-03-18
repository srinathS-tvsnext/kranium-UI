import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-servicerendered',
  templateUrl: './servicerendered.component.html',
  styleUrls: ['./servicerendered.component.css']
})
export class ServicerenderedComponent implements OnInit {
  date; patientdata_details; dropdownList; logindata_details; dropdownList_services; data_service_person;
  hidden_doc;superadmin_details;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService) { }
  consilated_date; DoctorsName; dropdownList_services_prescription;
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
    this.data_service_person = {};
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.logindata_details = JSON.parse(sessionStorage.getItem('logindata'));
    var dd = new Date();
    this.date = new Date();
    var dat = ("0" + dd.getDate()).slice(-2);
    var mon = ("0" + (dd.getMonth() + 1)).slice(-2);
    var yea = dd.getFullYear();
    var cons = yea + "-" + mon + "-" + dat;
    console.log(cons);
    this.get_services(this.logindata_details, cons);
    this.get_DoctorsName();
  }
  get_DoctorsName() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      if (resdata) {
        this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    });
  }
  f(date_data) {
    debugger;
    if (date_data) {
      var datae = ("0" + date_data.getDate()).slice(-2);
      var month = ("0" + (date_data.getMonth() + 1)).slice(-2);
      var year = date_data.getFullYear();
      this.consilated_date = year + "-" + month + "-" + datae;
      console.log(this.consilated_date);
      this.get_services(this.logindata_details, this.consilated_date);
    }
  }
  get_services(login_det, cons) {
    this.dropdownList_services = [];
    this.dropdownList_services_prescription = [];
    this.GlobalService.enableloader();
    var array = { login_det, cons }
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getservicerendered_doc', array).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.dropdownList = resdata['ResponseObject'];
        console.log(this.dropdownList);
        this.GlobalService.disableloader();
      } else {
        this.dropdownList = [];
        this.GlobalService.disableloader();
      }
    })
  }

  servicerenderd_detail(data_vi) {
    this.GlobalService.enableloader();
    this.servicerenderd_prescription(data_vi);
    this.data_service_person = data_vi;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getservicerendered', data_vi).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.dropdownList_services = resdata['ResponseObject'];
        console.log(this.dropdownList_services);
        this.GlobalService.disableloader();
      }else{
        this.dropdownList_services = [];
        this.GlobalService.disableloader();
      }
    })
  }

  servicerenderd_prescription(data_vi_yy) {
    this.GlobalService.enableloader();
    // getservicerendered_prescription
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getservicerendered_prescription', data_vi_yy).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.dropdownList_services_prescription = resdata['ResponseObject'];
        console.log(this.dropdownList_services_prescription);
        this.GlobalService.disableloader();
      }else{
        this.dropdownList_services_prescription = [];
        this.GlobalService.disableloader();
      }
    })
  }
  changedoctor_servicerenderd(data_doc, date_ss) {
    debugger;
    var dara_tt = [];
    data_doc.nr = data_doc.personell_nr;
    dara_tt.push(data_doc);
    var dd = new Date(date_ss);
    var dat = ("0" + dd.getDate()).slice(-2);
    var mon = ("0" + (dd.getMonth() + 1)).slice(-2);
    var yea = dd.getFullYear();
    var cons = yea + "-" + mon + "-" + dat;
    console.log(cons);
    this.get_services(dara_tt, cons);
  }
}

