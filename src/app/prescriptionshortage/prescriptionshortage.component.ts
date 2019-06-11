import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-prescriptionshortage',
  templateUrl: './prescriptionshortage.component.html',
  styleUrls: ['./prescriptionshortage.component.css']
})
export class PrescriptionshortageComponent implements OnInit {
  newarray; medicine_kranium_list; validation; medicine_kranium; new_data; cons_data;
  constructor(public dialogRef: MatDialogRef<PrescriptionshortageComponent>,
    @Inject(MAT_DIALOG_DATA) public searchdata: any, private http: Http, private GlobalService: GlobalService) { }

  ngOnInit() {
    this.new_data = {};
    this.cons_data = [];
    this.medicine_kranium = [];
    this.medicine_kranium_list = this.searchdata['Id'];
    console.log(this.medicine_kranium_list);
    for (var i = 0; i < this.medicine_kranium_list.length; i++) {
      if (this.medicine_kranium_list[i].quantity != 0) {
        this.medicine_kranium.push(this.medicine_kranium_list[i]);
      }
    }
    console.log(this.medicine_kranium);
  }

  medicineshortagepopupclose(): void {
    this.dialogRef.close();
  }
  medicineshortage_push(data_add) {
    debugger;
    for (var i = 0; i < data_add.length; i++) {
      if (data_add[i].checkbox) {
        this.cons_data = data_add[i];
      }
    }
    this.dialogRef.close(this.cons_data);
    console.log(this.cons_data);
  }

  changesubstitutes(clickdata) {
    console.log(clickdata);
    for (var i = 0; i < this.medicine_kranium.length; i++) {
      if (this.medicine_kranium[i].itemcode != clickdata.itemcode) {
        this.medicine_kranium[i].checkbox = false;
      }
    }
  }


}
