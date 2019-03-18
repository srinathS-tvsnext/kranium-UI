import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditconfigComponent } from '../../master/editconfig/editconfig.component';

@Component({
  selector: 'app-masterconfig',
  templateUrl: './masterconfig.component.html',
  styleUrls: ['./masterconfig.component.css']
})
export class MasterconfigComponent implements OnInit {
  
  configuration;
  dialogRef_ip;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.get_config();
  }

  get_config() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_config').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.GlobalService.disableloader();
        debugger;
        //var roo =JSON.parse(resdata['_body']);
        //this.config = roo.ResponseObject;
        this.configuration = resdata['ResponseObject'];
        console.log(this.configuration);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  edit_row(edit_row){
    console.log(edit_row);
    this.dialogRef_ip = this.dialog.open(EditconfigComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    })
    this.dialogRef_ip.afterClosed().subscribe(() => {
      this.get_config();
    });
  }

}
