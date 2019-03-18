import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReportviewComponent } from '../reportview/reportview.component';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  dialogRef;
  report_data_new; patientdata_details;acess_rights;
  constructor(public dialog: MatDialog, private http: HttpClient, private GlobalService: GlobalService) { }

  // onItemSelected($event) ;
  ngOnInit() {
    // console.log(this.GlobalService.user_access_rights);
    // this.acess_rights = this.GlobalService.user_access_rights;
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.get_reports(this.patientdata_details);
  }


  get_reports(patient_data) {
    this.GlobalService.enableloader();
    // this.GlobalService;
    console.log(this.GlobalService.baseurl);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_result_data_details', patient_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.report_data_new = resdata['ResponseObject'];
        console.log(this.report_data_new);
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  reportdetview(): void {
    this.dialogRef = this.dialog.open(ReportviewComponent, {
      data: {
        width: '600px',
      },
      disableClose: true
    })
  }


}
