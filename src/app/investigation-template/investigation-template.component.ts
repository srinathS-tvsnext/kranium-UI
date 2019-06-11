import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-investigation-template',
  templateUrl: './investigation-template.component.html',
  styleUrls: ['./investigation-template.component.css']
})
export class InvestigationTemplateComponent implements OnInit {

  tem_name;
  constructor(private http: HttpClient, private GlobalService: GlobalService, public dialogRef: MatDialogRef<InvestigationTemplateComponent>, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public medicineid: any, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.medicineid);
    if (this.medicineid.Id.manage_favourites_investigation_id) {
      this.tem_name = this.medicineid.Id.template_name;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  add_template(tempname) {
    console.log(tempname);
    console.log(this.medicineid);
    if (this.medicineid.Id.manage_favourites_investigation_id) {
      this.medicineid.Id.template_name = tempname;
      this.GlobalService.enableloader();
      debugger;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_inv_temp_name', this.medicineid.Id).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          console.log(resdata);
          this.openSnackBar("Updated sccessfully", "Close");
          this.GlobalService.disableloader();
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
          this.GlobalService.disableloader();
        }
      })
    } else {
      var arrayss = [{ template_name: tempname, id: this.medicineid }]
      debugger;
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favourites_Inestigation_template', arrayss).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata) {
          this.GlobalService.disableloader();
          this.openSnackBar("Saved Successfully", "Close");
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
          this.GlobalService.disableloader();
          this.openSnackBar("Error! , Please Retry", "Close");
        }
      })
    }

  }
  close() {
    this.dialogRef.close();
  }
}
