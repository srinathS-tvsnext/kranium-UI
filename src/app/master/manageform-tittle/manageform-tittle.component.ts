import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageformEdittittleComponent } from '../../master/manageform-edittittle/manageform-edittittle.component';

@Component({
  selector: 'app-manageform-tittle',
  templateUrl: './manageform-tittle.component.html',
  styleUrls: ['./manageform-tittle.component.css']
})
export class ManageformTittleComponent implements OnInit {
  
  mftittle;dialogRef_tittle;login_details;acess_rights;

  constructor(private http: Http, private GlobalService: GlobalService, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.get_mf_tittle();

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_mf_tittle() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_mform_tittle').subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        this.mftittle = body.ResponseObject;
        console.log(this.mftittle);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  edit_row(edit_row){
    console.log(edit_row);
    this.dialogRef_tittle = this.dialog.open(ManageformEdittittleComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_tittle.afterClosed().subscribe(() => {
      this.get_mf_tittle();
    });
  }

  disable_tittle(disablerow){
    disablerow.nr =  this.login_details[0]['nr'];
    console.log(disablerow);
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/disable_mf_tittle',disablerow).subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        if(body['IsSuccess']) {
          this.GlobalService.disableloader();
          this.get_mf_tittle();
          this.openSnackBar("Disabled Successfully","Close");
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Please Retry","Close");
        }  
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Please Retry","Close");
      }
    })
  }

  enable_tittle(enablerow){
    enablerow.nr =  this.login_details[0]['nr'];
    console.log(enablerow);
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/enable_mf_tittle',enablerow).subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        if(body['IsSuccess']) {
          this.GlobalService.disableloader();
          this.get_mf_tittle();
          this.openSnackBar("Enabled Successfully","Close");
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Please Retry","Close");
        }  
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Please Retry","Close");
      }
    })
  }

}
