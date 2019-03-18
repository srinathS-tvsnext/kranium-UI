import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-mastervital',
  templateUrl: './edit-mastervital.component.html',
  styleUrls: ['./edit-mastervital.component.css']
})
export class EditMastervitalComponent implements OnInit {

  login_details;disabledtype;editdata;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditMastervitalComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public unitdetail: any) { }
  

  ngOnInit() {
    this.disabledtype=true;
    this.editdata = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));

    console.log(this.unitdetail);
    this.get_units_det();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_units_det(){
    var type = this.unitdetail.get_detail.vitals_measurement_name;
    var units = this.unitdetail.get_detail.vitals_measurement_units;
    this.editdata.unit_type = type;
    this.editdata.units = units;
  }

  update_units(unitdata){
    if(unitdata.units == ""){
      this.openSnackBar("Please Enter All Fields", "Close");
    }else{
      unitdata.units_id = this.unitdetail.get_detail.vitals_units_master_id;
      unitdata.nr =  this.login_details[0]['nr'];
      console.log(unitdata);
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_vitalunits',unitdata).subscribe(resdata =>{
        if(resdata['IsSuccess']){
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Updated Successfully", "Close");
       }else{
          this.dialogRef.close();
          this.GlobalService.disableloader();
        }
      })
    }
  }

  cancel(){
    this.dialogRef.close();
  }

}
