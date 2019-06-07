import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  data = {};
  mobilenum;
  image_name;
  constructor(private GlobalService: GlobalService, public snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.get_imagelist();
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
    ]
  );

  forgot(data) {
    if (data.user == undefined) {
      //alert("Please Enter the User Name");
    }
    else {
      if (data.user) {
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_forgot_mobileno', data).subscribe(resdata => {
          debugger;
          console.log(resdata);

          if (resdata['IsSuccess']) {
            this.mobilenum = resdata['ResponseObject'][0].Mobile;

            sessionStorage.setItem('username', data.user);

            sessionStorage.setItem('forgotdata', this.mobilenum);
            this.GlobalService.disableloader();
            this.openSnackBar("Check Your Mobile No", "Close");
            this.router.navigate(['/Mobile']);
          }
          else {
            this.GlobalService.disableloader();
            alert("Non Authorized User");
          }

        })
      } else {
        alert("please give the user name = abhilashb");
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
