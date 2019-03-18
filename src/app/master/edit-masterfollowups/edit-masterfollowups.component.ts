import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, NgModel ,Validators} from '@angular/forms';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const MOBILE_REGEX = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
@Component({
  selector: 'app-edit-masterfollowups',
  templateUrl: './edit-masterfollowups.component.html',
  styleUrls: ['./edit-masterfollowups.component.css']
})
export class EditMasterfollowupsComponent implements OnInit {

  login_details;editdata;
  Departmentname;DoctorsName;
  disabled_doctor;disabled_depart;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditMasterfollowupsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public followupsdetail: any) { }

  ngOnInit() {
    this.disabled_doctor=true;
    this.disabled_depart=true;
    this.editdata={};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    
    console.log(this.followupsdetail);
    this.get_followups_det();
  }

  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(MOBILE_REGEX)]);

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  get_followups_det(){
    var conslt_id = this.followupsdetail.get_detail.sms_cross_consultaion_id;
    var department = this.followupsdetail.get_detail.department;
    var doct_name = this.followupsdetail.get_detail.doctor_name;
    // var doct_mobile = this.followupsdetail.get_detail.doc_mobileno;
    var asst_name = this.followupsdetail.get_detail.assistant_name;
    var asst_mobile = this.followupsdetail.get_detail.ast_mobileno;

    this.editdata.department = department;
    this.editdata.doctor = doct_name;
    // this.editdata.doctor_mob = doct_mobile;
    this.editdata.asst_name = asst_name;
    this.editdata.asst_mob = asst_mobile;
    
  }

  update_followups(updatedata){
    if((updatedata.asst_name && updatedata.asst_mob)==""){
      this.openSnackBar("Please Enter All Fields", "Close");
    }else{
      updatedata.units_id = this.followupsdetail.get_detail.sms_cross_consultaion_id;
      updatedata.nr =  this.login_details[0]['nr'];
      console.log(updatedata);
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/update_crossconsultation',updatedata).subscribe(resdata =>{
        if(resdata['IsSuccess']){
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Updated Successfully", "Close");
      }else{
          this.dialogRef.close();
          this.GlobalService.disableloader();
          this.openSnackBar("Error ! Retry", "Close");
        }
      })
    }
  }

  cancel(){
    this.dialogRef.close();
  }




}
