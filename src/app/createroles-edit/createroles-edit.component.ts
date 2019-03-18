import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, NgModel ,Validators} from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-createroles-edit',
  templateUrl: './createroles-edit.component.html',
  styleUrls: ['./createroles-edit.component.css']
})
export class CreaterolesEditComponent implements OnInit {

  login_details;editdata;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreaterolesEditComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public createrolesdetail: any) { }

  ngOnInit() {
    this.editdata={};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    
    console.log(this.createrolesdetail);
    this.get_croles_det();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_croles_det(){
    var crole_id = this.createrolesdetail.get_detail.new_create_roles_id;
    var crole_name = this.createrolesdetail.get_detail.roles_name;
    
    this.editdata.crole = crole_name;
    
  }

  editrole(editroledata){
    if(editroledata.crole == ""){
      this.openSnackBar("Please Enter the Field", "Close");
    }else{
      editroledata.roles_id = this.createrolesdetail.get_detail.new_create_roles_id;
      editroledata.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/edit_create_roles',editroledata).subscribe(resdata =>{
        debugger;
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Update Successfully", "Close");
        }
        else {
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Error ! Please Retry", "Close");
        }
      })
    } 
  }

  cancel(){
    this.dialogRef.close();
  }


}
