import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-templatename-drug-popup',
  templateUrl: './templatename-drug-popup.component.html',
  styleUrls: ['./templatename-drug-popup.component.css']
})
export class TemplatenameDrugPopupComponent implements OnInit {
  tem_name; template_drug_data;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public dialogRef: MatDialogRef<TemplatenameDrugPopupComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public medicineid: any) { }

  ngOnInit() {
    console.log(this.medicineid);
    this.get_temp_name(this.medicineid);
  }


  get_temp_name(medi) {
    debugger;

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/get_drug_temp_name', medi).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        var tt = resdata['ResponseObject'];
        this.tem_name = tt[0].template_name;
      }
    })
  }


  add_template_drug(tempname) {
    debugger;
    console.log(tempname);
    console.log(this.medicineid.Id.template_id);
    if (this.medicineid.Id.template_id) {
      var arrayss = [{ template_name: tempname, id: this.medicineid.Id.template_id }]
      debugger;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_drug_temp_name', arrayss).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.get_medicine_drug();
        } else {
          this.dialogRef.close();
        }
      })
    } else {
      var arrayss = [{ template_name: tempname, id: this.medicineid }]
      debugger;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesdrugtemplate', arrayss).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.get_medicine_drug();
        }
      })
    }

  }


  get_medicine_drug() {
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_drug').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        debugger;
        this.template_drug_data = resdata['ResponseObject'];
        this.dialogRef.close();
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }

  close() {
    this.dialogRef.close();
  }
}
