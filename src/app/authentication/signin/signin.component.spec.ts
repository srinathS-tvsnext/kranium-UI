import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const PASSWD = /^[A-Za-z]\w{6,12}*$/;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  data = {};
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {

  }
  login(data) {
    if (data.user == undefined || data.password == undefined) {
      // alert("Please Enter all the fields");
    }
    else {
      // this.data = { username: 'admin', password: 'admin' };
      console.log(data);
      this.http.post('http://localhost/global/api/index.php/v1/post/User/login', data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        alert(resdata);
        if (resdata['User_Name'] == 'Admin')
        
          this.router.navigate(['/Homescreen/Patientlist']);
        else
          alert("Non Authorized User");

        // routerLink='/Homescreen/Patientlist'
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
    { value: 'steak-0', viewValue: 'Bangalore Kengeri' },
    { value: 'pizza-1', viewValue: 'Bangalore Richmond road' },
    { value: 'tacos-2', viewValue: 'Chennai Perumbakkam' },
    { value: 'umm-2', viewValue: 'Hyderabad Ladki-ka pool' },
    { value: 'umm-2', viewValue: 'Hyderabad LB Nagar' },
    { value: 'umm-2', viewValue: 'Mumbai parel' },
  ];


}
