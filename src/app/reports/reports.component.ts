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

  ngOnInit() {
    
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.get_reports(this.patientdata_details);
  }


  get_reports(patient_data) {
    this.GlobalService.enableloader();
    console.log(this.GlobalService.baseurl);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_result_data_details', patient_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.report_data_new = resdata['ResponseObject'];
        console.log(this.report_data_new);
        for(let i=0;i<this.report_data_new.length;i++){
          this.report_data_new[i].result = JSON.parse(this.report_data_new[i].result);
        }
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  // reportdetview(): void {
  //   this.dialogRef = this.dialog.open(ReportviewComponent, {
  //     data: {
  //       width: '600px',
  //     },
  //     disableClose: true
  //   })
  // }

   reportgraphview(testname) {
     let graphdata = [];
     for(let i=0;i<this.report_data_new.length;i++) {
       let c = i+1
       if(this.report_data_new[i].test_name == testname) {
          graphdata.push({result: this.report_data_new[i].result.Results.EnteredValue,normalResult:'T'+c})
       }
     }
    this.dialogRef = this.dialog.open(ReportviewComponent,{
      width: '500px',
      data : {graphdata}
    })
   }

}
