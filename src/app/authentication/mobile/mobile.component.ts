import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const MOBILE_REGEX = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  data = {};
  mobile_num;
  username;
  get_mobilenum;
  image_name;
  split_mobno1;
  split_mobno2;

  constructor(private GlobalService: GlobalService, public snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.get_imagelist();
    this.mobile_num = JSON.parse(sessionStorage.getItem('forgotdata'));
    console.log(this.mobile_num);
    this.username = sessionStorage.getItem('username');
    console.log(this.username);
    //alert(this.mobile_num);
    //normal data and json data print session
    //console.log(this.mobile_num[0].Mobile);
    //alert(JSON.stringify(this.mobile_num[0].Mobile));

    this.mobilenum(this.username);
    this.splitmobilenum();
  }
  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(MOBILE_REGEX)
    ]
  );

  splitmobilenum() {
    var mobileno = String(this.mobile_num);
    this.split_mobno1 = mobileno.substr(0, 2);
    this.split_mobno2 = mobileno.substr(7, 9);
  }



  mobilenum(dat) {
    debugger;
    //dat.user=this.username;
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_mobileno', dat).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        //console.log(resdata['ResponseObject'][0]);
        this.get_mobilenum = resdata['ResponseObject'];
        console.log(this.get_mobilenum);
        // console.log("sds");
      }
      else {
        this.GlobalService.disableloader();
      }

    })
  }

  otp(data) {
    if (data.mobile == undefined) {
      this.openSnackBar("Please Enter the Mobile No.", "Close");
    }
    else {
      //this.router.navigate(['/Otp']);8122055789-testing mani num
      if (data.mobile == this.mobile_num) {
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_otp', data).subscribe(resdata => {
          debugger;
          console.log(resdata);

          if (resdata['IsSuccess']) {
            debugger;
            sessionStorage.setItem('otp', resdata['ResponseObject']);
            this.GlobalService.disableloader();
            //alert(JSON.stringify(resdata));
            this.openSnackBar("Enter the OTP No.", "Close");
            this.router.navigate(['/Otp']);
          }
          else {
            this.GlobalService.disableloader();
            this.openSnackBar("Some Error! Retry", "Close");
          }

        })
      }
      else {
        this.openSnackBar("!invalid Mobile Number", "Close");
      }

    }
  }


  get_imagelist() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_active_image').subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        debugger;
        // var body =JSON.parse(resdata['ResponseObject']);
        // console.log(body);
        //this.image_name = body.ResponseObject;
        this.image_name = resdata['ResponseObject'];
        console.log(this.image_name);
        debugger;
        this.GlobalService.disableloader();
      }
      else {
        debugger;
        this.image_name = resdata['ErrorObject'];
        this.GlobalService.disableloader();
      }
    })
  }



}
