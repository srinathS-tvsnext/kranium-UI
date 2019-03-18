import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { ReportviewComponent } from '../reportview/reportview.component';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-reportgraphicalview',
  templateUrl: './reportgraphicalview.component.html',
  styleUrls: ['./reportgraphicalview.component.css']
})

export class ReportgraphicalviewComponent implements OnInit {
  dialogReference;
  constructor(public dialogRef: MatDialogRef<ReportgraphicalviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: Http, public dialog: MatDialog) { }

  ngOnInit() {
  }

  graphicalpopupclose(): void {
    this.dialogRef.close();
  }

  graphicalpopupreopen(): void {
    this.dialogRef.close();
    this.dialogReference = this.dialog.open(ReportviewComponent, {
      data: {
        width: '600px',
      },
      disableClose: true
    })
  }
}
