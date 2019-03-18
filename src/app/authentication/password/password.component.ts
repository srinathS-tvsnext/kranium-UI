import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  data = {};
  user_name;
  image_name;

  constructor(private GlobalService: GlobalService, public snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.get_imagelist();
    this.user_name = sessionStorage.getItem('username');
    //alert(this.user_name);
    console.log(this.user_name);

  }
  paswordFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
    ]
  );

  CpaswordFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
    ]
  );


  success(data) {
    if (data.password == undefined) {
      this.openSnackBar("Please Enter the Password", "Close");
    }
    else {
      data.username = this.user_name;
      if (data.password == data.Cpassword) {
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/forgot_chpassword', data).subscribe(resdata => {
          debugger;
          console.log(resdata);

          if (resdata['IsSuccess']) {
            debugger;
            this.GlobalService.disableloader();
            sessionStorage.clear();
            this.openSnackBar("Password Reset Successfully", "Close");
            this.router.navigate(['/Signin']);
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Non Authorized User", "Close");
          }

        })
      }
      else {
        this.openSnackBar("!Invalid Confirm Password", "Close");
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
