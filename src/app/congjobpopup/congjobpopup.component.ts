import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-congjobpopup',
  templateUrl: './congjobpopup.component.html',
  styleUrls: ['./congjobpopup.component.css']
})
export class CongjobpopupComponent implements OnInit {

  login_details;
  disabledhour;disabledday;disabledminute;
  data={};

  constructor(private http: HttpClient, private router: Router,private GlobalService: GlobalService,public snackBar: MatSnackBar,public dialogRef: MatDialogRef<CongjobpopupComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public cronjobdetail: any) { }

  ngOnInit() {
    //this.disabledfun = 'true';
    console.log(this.cronjobdetail);
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
  }

  dur_type = [
    {value: '', viewValue: ''},
    {value: '5', viewValue: '5'},
    {value: '10', viewValue: '10'},
    {value: '15', viewValue: '15'},
    {value: '30', viewValue: '30'},
    {value: '45', viewValue: '45'},
    {value: '60', viewValue: '60'}
  ];

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  editminutes(data) {
    if (data.dur_minutes != "") {
      this.disabledhour = 'true';
      this.disabledday = 'true';
    } else {
      this.disabledhour = 'false';
      this.disabledday = 'false';
    }
  }
  editday(data){
    if (data.dur_days != "") {
      this.disabledhour = 'true';
      this.disabledminute = 'true';
    } else {
      this.disabledhour = 'false';
      this.disabledminute = 'false';
    }
  }
  edithour(data){
    if (data.dur_hours != "") {
      this.disabledminute = 'true';
      this.disabledday = 'true';
    } else {
      this.disabledminute = 'false';
      this.disabledday = 'false';
    }
  }

  // data={"dur":this.cronjobdetail['get_detail']['duration'],"dur_type":this.cronjobdetail['get_detail']['duration_type']};
  
  editduration(editdata){
    editdata.cron_id = this.cronjobdetail['get_detail']['cronjob_item_id'];
    editdata.nr =  this.login_details[0]['nr'];
    this.GlobalService.enableloader();
    console.log(editdata);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_cronjob_items',editdata).subscribe(resdata =>{
      if(resdata['IsSuccess']){
        this.GlobalService.disableloader();
        this.openSnackBar("Update Successfully", "Close");
        //this.get_cronjobslist();
        this.dialogRef.close();
        //this.router.navigate(['/Homescreen/Master/Mastercronjob']);
     }else{
        this.GlobalService.disableloader();
        this.openSnackBar("Error ! Retry", "Close");
        this.dialogRef.close();
        //this.router.navigate(['/Homescreen/Master/Mastercronjob']);
      }
    })
  }

  cancel(){
    this.dialogRef.close();
  }

  // cornjobdata;
  // get_cronjobslist(){
  //   this.GlobalService.enableloader();
  //   this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/cronjob_items').subscribe(resdata => {
  //     if(resdata['IsSuccess']){
  //       this.cornjobdata = resdata['ResponseObject'];
  //       this.GlobalService.disableloader();
  //       this.dialogRef.close();
  //     }else{
  //       this.GlobalService.disableloader();
  //     }
  //   })
  // }

}
