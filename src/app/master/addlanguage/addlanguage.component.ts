import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addlanguage',
  templateUrl: './addlanguage.component.html',
  styleUrls: ['./addlanguage.component.css']
})
export class AddlanguageComponent implements OnInit {

  data;login_details;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data={};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  save_language(lang_data){
    console.log(lang_data);
    if(lang_data.language_name && lang_data.morning && lang_data.afternoon && lang_data.evening && lang_data.night && lang_data.bf && lang_data.af != "") {
      lang_data.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/add_language', lang_data).subscribe(resdata => {
        debugger;
        if (resdata['IsSuccess']) {
          this.data={};
          this.GlobalService.disableloader();
          this.openSnackBar("Save Successfully", "Close");
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error! Retry", "Close");
        }
  
      })
    } else {
      this.openSnackBar("Please Enter the All Fields", "Close");
    }
  }
}
