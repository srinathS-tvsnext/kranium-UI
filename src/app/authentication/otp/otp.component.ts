import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const NUMBER_REGEX = /^[0-9]{1,6}$/;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  data = {};
  mobile_num;
  otp_num;
  image_name;
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
    this.otp_num = JSON.parse(sessionStorage.getItem('otp'));
    console.log(this.otp_num);

  }
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NUMBER_REGEX)
  ]
  );

  get_current_otp(data) {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_current_otp').subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        if (data.otp == this.otp_num) {
          this.openSnackBar("OTP Verfication is Successfully", "Close");
          this.router.navigate(['/Password']);
        } else {
          this.openSnackBar("Please Enter the Correct OTP", "Close");
        }
      } else {
        this.GlobalService.disableloader();
      }
    }, err => {
      this.GlobalService.disableloader();
    });
  }

  otp() {
    var mob = this.mobile_num;
    console.log(mob);
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_otp', mob).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        sessionStorage.setItem('otp', resdata['ResponseObject']);
        this.GlobalService.disableloader();
        this.openSnackBar("Enter the OTP No.", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Please Retry!", "Close");
      }
    }, err => {
      this.GlobalService.disableloader();
    });
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
    }, err => {
      this.GlobalService.disableloader();
    });
  }


}
