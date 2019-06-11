import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-opsumary-template-name',
  templateUrl: './opsumary-template-name.component.html',
  styleUrls: ['./opsumary-template-name.component.css']
})
export class OpsumaryTemplateNameComponent implements OnInit {

  tem_name; opsummary_template_list;
  template_namebox;
  constructor(public dialogRef: MatDialogRef<OpsumaryTemplateNameComponent>,
    private http: HttpClient, private GlobalService: GlobalService,
    private router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public medicineid: any, public snackBar: MatSnackBar) { }
  ngOnInit() {
    console.log(this.medicineid);
    console.log(this.medicineid.Id.opsum_tempid);
    console.log(this.medicineid.Id.opsum_tempname);

    if (this.medicineid.Id.opsum_tempid) {
      this.tem_name = this.medicineid.Id.opsum_tempname;
      this.template_namebox = true;
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
    if (this.medicineid.Id.opsum_tempid) {
      this.medicineid.Id.opsum_tempname = tempname;
      this.GlobalService.enableloader();
      debugger;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_op_temp_name', this.medicineid.Id).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          console.log(resdata);
          this.openSnackBar("Updated successfully", "Close");
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
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_opsummary_template', arrayss).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata) {
          this.openSnackBar("Saved successfully", "Close");
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.get_opsummary_template();
        } else {
          this.dialogRef.close();
          this.GlobalService.disableloader();
        }
      })
    }
  }



  get_opsummary_template() {
    // get_opsummary_template
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/get_opsummary_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.opsummary_template_list = resdata['ResponseObject'];
        console.log(this.opsummary_template_list);
      }
    })
  }
  close() {
    this.dialogRef.close();
  }
}
