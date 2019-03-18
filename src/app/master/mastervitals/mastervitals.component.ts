import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EditMastervitalComponent } from '../../master/edit-mastervital/edit-mastervital.component';
@Component({
  selector: 'app-mastervitals',
  templateUrl: './mastervitals.component.html',
  styleUrls: ['./mastervitals.component.css']
})
export class MastervitalsComponent implements OnInit {
  add_vitals; disabledpos; disabledunit;
  login_details; acess_rights;
  vitalunits;
  dialogRef_units;
  vitalunit_type;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialog: MatDialog) { }


  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.disabledpos = true;
    this.disabledunit = false;
    this.add_vitals = {};
    this.get_units();
    this.get_unit_type();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  vitaltype = [
    { value: "Height", viewValue: "Height" },
    { value: "Weight", viewValue: "Weight" },
    { value: "Temperature", viewValue: "Temperature" },
    { value: "Pulse", viewValue: "Pulse" },
    { value: "Resp", viewValue: "Resp" },
    { value: "BP:Systolic/Diastolic", viewValue: "Systolic_Diastolic" },
    { value: "Body Mass Index", viewValue: "Body_Mass_Index" },
    { value: "BSA", viewValue: "BSA" }
  ];

  position = [
    { value: "Sitting", viewValue: "Sitting" },
    { value: "Standing", viewValue: "Standing" },
    { value: "Running", viewValue: "Running" }
  ];

  editfunction(data) {
    console.log(data);
    if (data.vitals_measurement_name == "BP:Systolic/Diastolic") {
      this.disabledpos = false;
      this.disabledunit = true;
    } else {
      this.disabledpos = true;
      this.disabledunit = false;
    }
  }

  add_vitals_units(data_vital_units) {
    if((data_vital_units.vitals_measurement_name && data_vital_units.vitals_measurement_units)== undefined){
      this.openSnackBar("Please Enter All Fields", "Close");
    }else{
      data_vital_units.nr = this.login_details[0]['nr'];
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/add_vitals_units', data_vital_units).subscribe(resdata => {
        console.log(resdata);
        if (resdata['IsSuccess']) {
          console.log(resdata['ResponseObject']);
          this.add_vitals.vitals_measurement_units = "";
          this.add_vitals = {};
          this.get_units();
          this.openSnackBar("Save Successfully", "Close");
        }else{
          this.openSnackBar("Some Error! Retry", "Close");
        }
      })
    }
  }

  cancel(){
    this.add_vitals = {};
  }

  get_unit_type() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_vitalunit_type').subscribe(resdata => {
      if (resdata) {
        // var body =JSON.parse(resdata['_body']);
        // this.vitalunits = body.ResponseObject;
        this.vitalunit_type = resdata['ResponseObject'];
        console.log(this.vitalunit_type);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_units() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_vitalunits').subscribe(resdata => {
      if (resdata) {
        // var body =JSON.parse(resdata['_body']);
        // this.vitalunits = body.ResponseObject;
        this.vitalunits = resdata['ResponseObject'];
        console.log(this.vitalunits);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  edit_row(edit_row) {
    console.log(edit_row);
    this.dialogRef_units = this.dialog.open(EditMastervitalComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_units.afterClosed().subscribe(() => {
      this.get_units();
    });
  }

  delete_unit_row(deleterow, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      deleterow.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/delete_vitalunits', deleterow).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.get_units();
          this.get_unit_type();
          this.GlobalService.disableloader();
          this.openSnackBar("Delete Successfully", "Close");
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error !", "Close");
        }
      })
    }
  }

}
