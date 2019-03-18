import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-masterchangepassword',
  templateUrl: './masterchangepassword.component.html',
  styleUrls: ['./masterchangepassword.component.css']
})
export class MasterchangepasswordComponent implements OnInit {

  data = {};
  login_details;
  closeeye_h0;openeye_h0;closeeye_h1;openeye_h1;closeeye_h2;openeye_h2;
  
  //user_name;

  constructor(private GlobalService: GlobalService, public snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.closeeye_h0 = true;this.openeye_h0 = false;
    this.closeeye_h1 = true;this.openeye_h1 = false;
    this.closeeye_h2 = true;this.openeye_h2 = false;
    
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  changePasswd(data) {
    data.User_ID = this.login_details[0].User_ID;
    data.nr = this.login_details[0].nr;
    if ((data.currentpass && data.newpass && data.re_newpass) == undefined) {
      debugger;
      //alert("Please Enter the Password");
      this.openSnackBar("Please Enter the Fields", "Close");
    }
    else {
      debugger;
      //data.username = this.user_name;
      if (data.newpass == data.re_newpass) {
        debugger;
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/reset_password', data).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            debugger;
            this.GlobalService.disableloader();
            this.data = {};
            this.openSnackBar("Password Changed Successfully !!", "Close");
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Password couldn't Changed!", "Close");
          }
        })
      }
      else {
        this.openSnackBar("!Invalid Confirm Re-New Password", "Close");
      }
    }
  }

  
  openeye_0() {
    document.getElementsByTagName("input")[0].type = "text";
    this.closeeye_h0 = false;
    this.openeye_h0 = true;
  }
  closeeye_0() {
    document.getElementsByTagName("input")[0].type = "password";
    this.closeeye_h0 = true;
    this.openeye_h0 = false;
  }
  openeye_1() {
    document.getElementsByTagName("input")[1].type = "text";
    this.closeeye_h1 = false;
    this.openeye_h1 = true;
  }
  closeeye_1() {
    document.getElementsByTagName("input")[1].type = "password";
    this.closeeye_h1 = true;
    this.openeye_h1 = false;
  }
  openeye_2() {
    document.getElementsByTagName("input")[2].type = "text";
    this.closeeye_h2 = false;
    this.openeye_h2 = true;
  }
  closeeye_2() {
    document.getElementsByTagName("input")[2].type = "password";
    this.closeeye_h2 = true;
    this.openeye_h2 = false;
  }

}
