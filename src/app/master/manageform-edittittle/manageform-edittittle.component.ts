import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manageform-edittittle',
  templateUrl: './manageform-edittittle.component.html',
  styleUrls: ['./manageform-edittittle.component.css']
})
export class ManageformEdittittleComponent implements OnInit {

  editdata; login_details; get_mf_tittle;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ManageformEdittittleComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public tittledetail: any) { }

  ngOnInit() {
    this.editdata = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));

    console.log(this.tittledetail);
    this.get_tittle_det();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  update_mf_tittle(tittle) {
    if (tittle.tittle === '') {
      this.openSnackBar("Please Enter the Title Name", "Close");
    } else {
      tittle.head_id = this.tittledetail.get_detail.history_main_form_name_id;
      tittle.nr = this.login_details[0]['nr'];
      console.log(tittle);
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_mform_tittle', tittle).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Updated Successfully", "Close");
        } else {
          this.GlobalService.disableloader();
          this.dialogRef.close();
        }
      });
    }
  }

  get_tittle_det() {
    var head = this.tittledetail.get_detail.history_main_form_name;
    this.editdata.tittle = head;
  }

}
