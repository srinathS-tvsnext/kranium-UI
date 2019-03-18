import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const PASSWD = /^[A-Za-z]\w{6,12}*$/;
@Component({
  selector: 'app-signin_old',
  templateUrl: './signin_old.component.html',
  styleUrls: ['./signin_old.component.css']
})

export class SigninComponent implements OnInit {
  data = {};
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  
  imgurl="../../assets/img/logo.jpg";
  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  login(data) {

    if (data.user == undefined || data.password == undefined) {
      this.openSnackBar("Please Enter All the Fields", "Close");
    }
    else {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/login', data).subscribe(resdata => {
        if (resdata['IsSuccess'] && resdata['ResponseObject'] != null) {
          this.GlobalService.disableloader();
          sessionStorage.setItem('logindata', JSON.stringify(resdata['ResponseObject']));
          this.openSnackBar("Welcome to Global", "Close");
          this.router.navigate(['/Homescreen/Patientlist']);
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Please Ensure that Given Credentials are Correct !!", "Close");
        }
      })
    }
  }

  submitForm(data) {
    debugger;
    console.log(data);
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern(EMAIL_REGEX)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
    // Validators.pattern(PASSWD
  ]);

  foods = [
    { value: '../../assets/img/logo.jpg', viewValue: 'Chennai Perumbakkam' },
    { value: '../../assets/img/logo.jpg', viewValue: 'Bangalore Kengeri' },
    { value: '../../assets/img/logo.jpg', viewValue: 'Bangalore Richmond Road' },
    { value: '../../assets/img/logo.jpg', viewValue: 'Hyderabad Lakdi-ka-pool' },
    { value: '../../assets/img/logo.jpg', viewValue: 'Hyderabad LB Nagar' },
    { value: '../../assets/img/logo3.png', viewValue: 'Mumbai Parel' },
  ];


}
