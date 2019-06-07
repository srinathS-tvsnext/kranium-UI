import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CongjobpopupComponent } from '../congjobpopup/congjobpopup.component';

@Component({
  selector: 'app-crongjob-settings',
  templateUrl: './crongjob-settings.component.html',
  styleUrls: ['./crongjob-settings.component.css']
})
export class CrongjobSettingsComponent implements OnInit {

  cornjobdata;login_details;
  dialogRef_cron;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService,public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.get_cronjobslist();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_cronjobslist(){
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/cronjob_items').subscribe(resdata => {
      if(resdata['IsSuccess']){
        this.cornjobdata = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }else{
        this.GlobalService.disableloader();
      }
    })
  }

  geteditduration(geteditdata){
    console.log(geteditdata);
    this.dialogRef_cron = this.dialog.open(CongjobpopupComponent, {
      data: {
        get_detail: geteditdata
      },
      disableClose: false
    })
    this.dialogRef_cron.afterClosed().subscribe(() => {
      this.get_cronjobslist();
    });
  }

  editduration(editdata){
    this.GlobalService.enableloader();
    editdata.nr =  this.login_details[0]['nr'];
    console.log(editdata);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_cronjob_items',editdata).subscribe(resdata =>{
      if(resdata['IsSuccess']){
        this.GlobalService.disableloader();
      
     }else{
        this.GlobalService.disableloader();
 
      }
    })
  }

  getcron_now(nowcron){
    this.GlobalService.enableloader();
    console.log(nowcron);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/run_now_cronjob',nowcron).subscribe(resdata => {
      if(resdata['IsSuccess']){
        this.GlobalService.disableloader();
        this.openSnackBar("Updated Successfully", "Close");
      }else{
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error !", "Close");
      }
    })
  }

  
}
