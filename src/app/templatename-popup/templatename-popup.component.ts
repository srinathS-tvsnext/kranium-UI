import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-templatename-popup',
  templateUrl: './templatename-popup.component.html',
  styleUrls: ['./templatename-popup.component.css']
})
export class TemplatenamePopupComponent implements OnInit {
  tem_name;
  constructor(public dialogRef: MatDialogRef<TemplatenamePopupComponent>, private http: HttpClient, private GlobalService: GlobalService, private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public medicineid: any, public snackBar: MatSnackBar) { }
  ngOnInit() {
    console.log(this.medicineid);
    if (this.medicineid.Id.manage_favourites_prescription_id) {
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
    if (this.medicineid.Id.manage_favourites_prescription_id) {
      this.medicineid.Id.template_name = tempname;
      debugger;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_pres_temp_name', this.medicineid.Id).subscribe(resdata => {
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
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesprescriptiontemplate', arrayss).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata) {
          this.openSnackBar("Saved sccessfully", "Close");
          this.GlobalService.disableloader();
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
          this.GlobalService.disableloader();
        }
      })
    }

  }
  close() {
    this.dialogRef.close();
  }

}
