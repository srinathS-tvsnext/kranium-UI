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
    
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_mobileno', dat).subscribe(resdata => {
      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.get_mobilenum = resdata['ResponseObject'];
        console.log(this.get_mobilenum);
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
      if (data.mobile == this.mobile_num) {
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_otp', data).subscribe(resdata => {
          
          console.log(resdata);

          if (resdata['IsSuccess']) {
            
            sessionStorage.setItem('otp', resdata['ResponseObject']);
            this.GlobalService.disableloader();
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
    
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_active_image').subscribe(resdata => {
      
      if (resdata['IsSuccess']) {
        
        this.image_name = resdata['ResponseObject'];
        console.log(this.image_name);
        
        this.GlobalService.disableloader();
      }
      else {
        
        this.image_name = resdata['ErrorObject'];
        this.GlobalService.disableloader();
      }
    })
  }



}
