import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvestigationEditShortcodeComponent } from '../investigation-edit-shortcode/investigation-edit-shortcode.component';

@Component({
  selector: 'app-investigation-shortcode',
  templateUrl: './investigation-shortcode.component.html',
  styleUrls: ['./investigation-shortcode.component.css']
})
export class InvestigationShortcodeComponent implements OnInit {
  shortcodes; dialogRef_scode; acess_rights;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.get_shortcode();
  }
  synch_json() {
    debugger;
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Investigation/shortcode_to_json_sink').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.GlobalService.disableloader();
        console.log(resdata);
      } else {
        this.GlobalService.disableloader();
      }
    })
    // shortcode_to_json_sink
  }


  get_shortcode() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Investigation/get_shortcode').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.GlobalService.disableloader();
        this.shortcodes = resdata['ResponseObject'];
        console.log(this.shortcodes);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }


  edit_row(edit_row) {
    console.log(edit_row);
    this.dialogRef_scode = this.dialog.open(InvestigationEditShortcodeComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_scode.afterClosed().subscribe(() => {
      this.get_shortcode();
    });
  }

}
