import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditMasterfollowupsComponent } from '../../master/edit-masterfollowups/edit-masterfollowups.component';

const MOBILE_REGEX = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
@Component({
  selector: 'app-masterfollowups',
  templateUrl: './masterfollowups.component.html',
  styleUrls: ['./masterfollowups.component.css']
})
export class MasterfollowupsComponent implements OnInit {

  Departmentname; DoctorsName; select_depart; data; login_details; consultaiondata; dialogRef_conslt;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.data = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.get_Departmet();
    this.get_DoctorsName();
    this.get_consultationdata();
  }

  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(MOBILE_REGEX)]);

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  // user_sms(assistant){
  //   this.GlobalService.enableloader();
  //   this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_user_sms', assistant).subscribe(resdata => {
  //     if (resdata['IsSuccess']) {
  //       this.GlobalService.disableloader();
  //     }
  //     else {
  //       this.GlobalService.disableloader();
  //     }
  //   }) 
  // }

  get_Departmet() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_investifation_department_masters').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.Departmentname = resdata['ResponseObject'];
        console.log(this.Departmentname);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_DoctorsName() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      if (resdata) {
        this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  save_crossconsultation(userdata) {

    userdata.nr = this.login_details[0]['nr'];
    console.log(userdata);
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/add_crossconsultaion', userdata).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.data = {};
        this.get_consultationdata();
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }

    })

  }

  get_consultationdata() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_crossconsultationdata').subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        debugger;
        // var body =JSON.parse(resdata['_body']);
        // this.vitalunits = body.ResponseObject;
        this.consultaiondata = resdata['ResponseObject'];
        console.log(this.consultaiondata);
        debugger;
        this.GlobalService.disableloader();
      }
      else {
        debugger;
        this.GlobalService.disableloader();
      }
    })
  }

  delete_row(deletedata, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      deletedata.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/delete_crossconsultaion', deletedata).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.get_consultationdata();
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

  edit_row(edit_row) {
    console.log(edit_row);
    this.dialogRef_conslt = this.dialog.open(EditMasterfollowupsComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_conslt.afterClosed().subscribe(() => {
      this.get_consultationdata();
    });
  }



}
