import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addconfig',
  templateUrl: './addconfig.component.html',
  styleUrls: ['./addconfig.component.css']
})
export class AddconfigComponent implements OnInit {

  config;login_details;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.config = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  Locations = [
    { value: 'Chennai Perumbakkam', viewValue: 'Chennai Perumbakkam' },
    { value: 'Bangalore Kengeri', viewValue: 'Bangalore Kengeri' },
    { value: 'Bangalore Richmond Road', viewValue: 'Bangalore Richmond Road' },
    { value: 'Hyderabad Lakdi-ka-pool', viewValue: 'Hyderabad Lakdi-ka-pool' },
    { value: 'Hyderabad LB Nagar', viewValue: 'Hyderabad LB Nagar' },
    { value: 'Mumbai Parel', viewValue: 'Mumbai Parel' },
  ];

  save_config(data){
    data.nr = this.login_details[0]['nr'];
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/add_config', data).subscribe(resdata => {
      
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
        this.router.navigate(['/Homescreen/Master/Masterconfig']);
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }
    }, err => {
      this.GlobalService.disableloader();
    });
  }

}
