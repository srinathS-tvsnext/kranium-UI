import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editconfig',
  templateUrl: './editconfig.component.html',
  styleUrls: ['./editconfig.component.css']
})
export class EditconfigComponent implements OnInit {

  login_details;editdata;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditconfigComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public ipdetail: any) { }

  ngOnInit() {
    this.editdata = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));

    console.log(this.ipdetail);
    this.get_ip_det();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_ip_det(){
    // var ip_adds = this.ipdetail.get_detail.ip;
    // this.editdata.ip_adr = ip_adds;
    var inst_ip_adds = this.ipdetail.get_detail.insert_ip;
    this.editdata.inst_ip_adr = inst_ip_adds;
    var get_ip_adds = this.ipdetail.get_detail.get_ip;
    this.editdata.get_ip_adr = get_ip_adds;
  }

  update_ip_addr(dataip){
    dataip.ip_id = this.ipdetail.get_detail.configuration_id;
    dataip.nr =  this.login_details[0]['nr'];
    console.log(dataip);
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_ip_config',dataip).subscribe(resdata =>{
      if(resdata['IsSuccess']){
        this.GlobalService.disableloader();
        this.dialogRef.close();
        this.openSnackBar("Updated Successfully", "Close");
     }else{
        this.GlobalService.disableloader();
        this.dialogRef.close();
      }
    })
  }

  closepopup(){
    this.dialogRef.close();
  }


}
