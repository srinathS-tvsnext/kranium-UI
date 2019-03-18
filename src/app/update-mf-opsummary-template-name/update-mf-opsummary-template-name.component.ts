import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-mf-opsummary-template-name',
  templateUrl: './update-mf-opsummary-template-name.component.html',
  styleUrls: ['./update-mf-opsummary-template-name.component.css']
})
export class UpdateMfOpsummaryTemplateNameComponent implements OnInit {

  tem_name;login_details;

  constructor(public dialogRef: MatDialogRef<UpdateMfOpsummaryTemplateNameComponent>,
    private http: HttpClient, private GlobalService: GlobalService,
    private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public temp_details: any, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.tem_name={};
    console.log(this.temp_details);
    this.get_template_name();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_template_name(){
    this.tem_name = this.temp_details.temp_details.template_name;
  }

  update_template(tempdata){
    var loginId = this.login_details[0]['nr'];
    var tempid = this.temp_details.temp_details.manage_favourites_opsummary_id;
    var template_data = {"nr" : loginId , "temp_name" : tempdata , "temp_id" : tempid};
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_mf_op_temp_name', template_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.dialogRef.close();
        this.openSnackBar("Updated Successfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.dialogRef.close();
        this.openSnackBar("Some Error! Please Retry", "Close");
      }
    })

  }

  close(){
    this.dialogRef.close();
  }
}

  