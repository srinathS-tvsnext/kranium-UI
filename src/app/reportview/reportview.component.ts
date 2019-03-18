import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { ReportgraphicalviewComponent } from '../reportgraphicalview/reportgraphicalview.component';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-reportview',
  templateUrl: './reportview.component.html',
  styleUrls: ['./reportview.component.css']
})
export class ReportviewComponent implements OnInit {
  dialogRef;
  // dialoggrapRef;

  constructor(public dialogviewRef: MatDialogRef<ReportviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: Http, public dialog: MatDialog) { }

  ngOnInit() {
  }

  reportviewpopupclose(): void {
    this.dialogviewRef.close();
  }


  graphicalview(): void {
    this.dialogviewRef.close();
    this.dialogRef = this.dialog.open(ReportgraphicalviewComponent, {
      data: {
        width: '600px',
      },
      disableClose: true
    })
  }
}
