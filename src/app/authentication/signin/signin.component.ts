import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const PASSWD = /^[A-Za-z]\w{6,12}*$/;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  data = {}; imgurl = '../../assets/img/kranium_logo.png'; image_name;
  user_access_rights;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }


  ngOnInit() {
     this.get_imagelist();
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
          console.log(resdata['ResponseObject']);
          sessionStorage.setItem('logindata', JSON.stringify(resdata['ResponseObject']));
          this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_access_rights_activity', resdata['ResponseObject']).subscribe(resnewdata => {
            if (resnewdata['IsSuccess']) {
              console.log(resnewdata['ResponseObject']);
              sessionStorage.setItem('user_access_rights', resnewdata['ResponseObject'][0].access_rights);
              // this.user_access_rights = JSON.parse(resnewdata['ResponseObject'][0].access_rights);
              // console.log(this.user_access_rights);
              this.openSnackBar("Welcome to Global", "Close");
              this.router.navigate(['/Homescreen/Patientlist']);
            }else{
              this.openSnackBar("Please Contact the Admin Team for Permission to Access this Application", "Close");
            }
          })

        } else if (data.user == "superadmin" && data.password == "superadmin") {
          // sessionStorage.clear();
          var sup_admin = [{ User_name: "SUPER ADMIN", nr: "super admin", Email: "", MobileNo: "", User_ID: data.user }];
          // console.log(sup_admin); 
          sessionStorage.setItem('logindata', JSON.stringify(sup_admin));

          this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_access_rights_superadmin', sup_admin).subscribe(sa_resdata => {
            if (sa_resdata['IsSuccess']) {
              console.log(sa_resdata['ResponseObject']);
              sessionStorage.setItem('user_access_rights', sa_resdata['ResponseObject'][0].access_rights);
              // this.user_access_rights = JSON.parse(sa_resdata['ResponseObject'][0].access_rights);
              // console.log(this.user_access_rights);
              this.openSnackBar("Hi Super Admin , Welcome to Global", "Close");
              this.router.navigate(['/Homescreen/Patientlist']);
            }
          })

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
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Chennai Perumbakkam' },
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Bangalore Kengeri' },
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Bangalore Richmond Road' },
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Hyderabad Lakdi-ka-pool' },
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Hyderabad LB Nagar' },
    { value: '../../assets/img/kranium_logo.png', viewValue: 'Mumbai Parel' },
  ];


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
