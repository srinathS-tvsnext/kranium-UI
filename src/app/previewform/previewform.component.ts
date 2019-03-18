import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-previewform',
  templateUrl: './previewform.component.html',
  styleUrls: ['./previewform.component.css']
})
export class PreviewformComponent implements OnInit {
  formdata; login_details; formdatacr; sub_id; array_preform;


  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<PreviewformComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public get_detail: any) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.get_detail);
    // console.log(this.get_detail[0].form_id);
    // this.formdatacr = this.get_detail;
    this.get_preview_det(this.get_detail);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  get_preview_det(getdet) {
    debugger;
    this.sub_id = getdet.get_detail[0].form_id;
    console.log(this.sub_id);
    this.array_preform = { data_id: this.sub_id };
    console.log(this.array_preform);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_preview_formdetailview', this.array_preform).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        debugger;
        this.formdatacr = resdata['ResponseObject'];
        console.log(this.formdatacr);
      }
      // routerLink='/Homescreen/Patientlist'
    })

  }

  cancel(){
    this.dialogRef.close();
  }

  investigationlistpopupclose(): void {
    this.dialogRef.close();
  }
  preview() {
    debugger;

  }
}
