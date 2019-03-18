import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CreaterolesEditComponent } from '../createroles-edit/createroles-edit.component';

@Component({
  selector: 'app-createroles',
  templateUrl: './createroles.component.html',
  styleUrls: ['./createroles.component.css']
})
export class CreaterolesComponent implements OnInit {

  data = {};
  login_details;
  get_croles;
  crole;
  // editdata={};
  dialogRef_croles;
  //temp_role_data;
  //ddd;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {

    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);
    this.get_roles(this.login_details);

    //this.temp_role_data = [];

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  createrole(data) {
    data.nr = this.login_details[0]['nr'];
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/create_roles', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {

        // this.id_surgery.push(resdata['ResponseObject']);
        // console.log(this.id_surgery);
        // this.get_surgery(this.patientdata_details);
        this.get_roles(this.login_details);
        this.data = {};
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }

    })
  }

  get_roles(data) {
    debugger;
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_create_roles', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.get_croles = resdata['ResponseObject'];
        debugger;
        this.GlobalService.disableloader();
      }
      else {
        debugger;
        this.GlobalService.disableloader();
      }

    })
  }


  edit_row(edit_row) {
    console.log(edit_row);
    this.dialogRef_croles = this.dialog.open(CreaterolesEditComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_croles.afterClosed().subscribe(() => {
      this.get_roles(this.login_details);
    });
  }


  deleterole(deletedata, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      deletedata.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/delete_create_roles', deletedata).subscribe(resdata => {
        debugger;
        if (resdata['IsSuccess']) {
          this.get_roles(this.login_details);
          debugger;
          this.GlobalService.disableloader();
          this.openSnackBar("Delete Successfully", "Close");
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error !", "Close");
        }
      })
    }
  }


}
