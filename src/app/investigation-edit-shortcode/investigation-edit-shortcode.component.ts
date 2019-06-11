import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-investigation-edit-shortcode',
  templateUrl: './investigation-edit-shortcode.component.html',
  styleUrls: ['./investigation-edit-shortcode.component.css']
})
export class InvestigationEditShortcodeComponent implements OnInit {

  login_details; editdata;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<InvestigationEditShortcodeComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public scodedetail: any) { }

  ngOnInit() {
    this.editdata = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));

    console.log(this.scodedetail);
    this.get_scode_det();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_scode_det() {
    var full_code_name = this.scodedetail.get_detail.item_long_description;
    var short_code_name = this.scodedetail.get_detail.shortcode;
    this.editdata.item_long_description = full_code_name;
    this.editdata.shortcode = short_code_name;
  }

  update_scode(dataedit) {
    debugger;
    dataedit.investigation_master_id = this.scodedetail.get_detail.investigation_master_id;
    dataedit.MB = this.login_details[0]['nr'];
    console.log(dataedit);
    debugger;
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Investigation/edit_master_shortcode', dataedit).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        debugger;
        this.GlobalService.disableloader();
        this.dialogRef.close();
        this.openSnackBar("Updated Successfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error ! Retry", "Close");
      }
    })

  }

}
