//import { Injectable } from '@angular/core';
import { Injectable, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
// import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

@Injectable()
export class GlobalService {
  location: Location;
  patient = new Subject();
  // baseurl="http://10.91.19.198:8080/global_uat";
  // baseurl = "http://14.141.212.155:8080/globaluat";
  // baseurl = "http://172.16.150.200/globaluat";

  baseurl = "http://localhost/global";
  // baseurl = "http://10.91.19.198:7777/global_uat";
  // baseurl = "http://" + window.location.hostname + ":" + window.location.port + "/global";
  // baseurl = "http://" + window.location.hostname + "/global";

  // kranium ip address
  // baseurl = "http://" + window.location.hostname + "/global";
  user_access_rights; login_user; login_user_superadmin;
  ngOnInit() {
    // console.log(document.URL);
    
  }

  constructor(private http: HttpClient, private router: Router, location: Location) {
    this.location = location;
    // console.log(this.location);
    // var hostname = this.window.location.hostname;
    // var titlee = this.location.prepareExternalUrl(this.location.path());
    // console.log(titlee);
    // console.log(window.location.hostname);
    // console.log(window.location.host);
    // console.log(window.location.port);
  }


  //loader
  Loader = new Subject<Boolean>();
  showontop = new Subject<any>();

  enableloader() {
    debugger;
    this.Loader.next(false);
  }
  disableloader() {
    debugger;
    this.Loader.next(true);
  }

  getLoaderStatus(): Observable<any> {
    return this.Loader.asObservable();
  }

  getshowontopvitals(): Observable<any> {
    return this.Loader.asObservable();
  }
  vitalsshotop(data_showtop) {
    this.showontop.next(data_showtop);
  }
  get_access_rights_activity() {
    this.login_user = JSON.parse(sessionStorage.getItem('logindata'));
    this.login_user_superadmin = JSON.parse(sessionStorage.getItem('login_superadmin'));
    console.log(this.login_user);
    if (this.login_user) {
      this.http.post(this.baseurl + '/api/index.php/v1/get/Common/get_access_rights_activity', this.login_user).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          console.log(resdata['ResponseObject']);
          // this.user_access_rights = JSON.parse(resdata['ResponseObject'][0].access_rights);
          // console.log(this.user_access_rights);
          sessionStorage.setItem('user_access_rights', resdata['ResponseObject'][0].access_rights);
        }
      })
    } else if (this.login_user_superadmin) {
      this.http.post(this.baseurl + '/api/index.php/v1/get/Common/get_access_rights_superadmin', this.login_user_superadmin).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          console.log(resdata['ResponseObject']);
          // this.user_access_rights = JSON.parse(resdata['ResponseObject'][0].access_rights);
          // console.log(this.user_access_rights);
          sessionStorage.setItem('user_access_rights', resdata['ResponseObject'][0].access_rights);
        }
      })
    } else {
      console.log("User access is Empty");
    }

  }

  //end-loader
}
