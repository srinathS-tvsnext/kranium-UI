import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-investigationlist',
  templateUrl: './investigationlist.component.html',
  styleUrls: ['./investigationlist.component.css']
})
export class InvestigationlistComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InvestigationlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: Http) { }

  ngOnInit() {
  }
  
  investigationlistpopupclose(): void {
    this.dialogRef.close();
  }
}
