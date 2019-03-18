import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-Addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.css']
})
export class AddrolesComponent implements OnInit {
  roles; items; showGreeting; exampleDatas; viewRole; btn;
  // optionsModel: number[];
  myOptions: IMultiSelectOption[];
  formusers_drop; add_roles; new_array; userId; edit_data;
  login_details;disable_rolename;
  constructor(private http: Http, private GlobalService: GlobalService, public snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.btn = "Add";
    this.viewusers();
    this.exampleDatas = [];
    this.edit_data = [];
    this.add_roles = {};
    this.new_array = [];
    this.get_Roles();
    this.get_viewroles();
    this.disable_rolename=false;

  }
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }
  public trigger = function ($event) {
    if ($event.value && $event.value.selectedRows) {
      this.selectedRows = $event.value.selectedRows.length;
    }
  };
  public refreshValue(value: any): void {
    this.value = value;
  }
  viewusers() {
    debugger;
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users').subscribe(resdata => {
      debugger;
      if (resdata) {
        this.GlobalService.disableloader();
        var data_custom = JSON.parse(resdata['_body']);
        // this.formusers_drop = [];
        this.formusers_drop = data_custom['ResponseObject'];
        if (this.formusers_drop) {
          for (var i = 0; i < this.formusers_drop.length; i++)
            this.formusers_drop[i].id = i + 1;
        }
        this.showGreeting = true;
        for (let k = 0; k < this.formusers_drop.length; k++) {
          this.exampleDatas.push({
            "id": this.formusers_drop[k].id.toString(),
            "text": this.formusers_drop[k].name
          });
        }
        this.items = this.exampleDatas;
        console.log(this.formusers_drop);
      }
      else {
        this.GlobalService.disableloader();
      }
    })
  }

  save_addroles(data) {
    console.log(data);
    data.nr = this.login_details[0]['nr'];
    debugger;
    if((data.userId && data.role) == undefined){
      this.openSnackBar("Please Enter All Fields", "Close");
    }else{
      // var newdata = { "user_data": this.new_array, "role": data.role };
      this.GlobalService.enableloader();
      if (this.btn == "Add") {
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/add_roles_save', data).subscribe(resdata => {
          console.log(resdata);
          var newsa = resdata['_body'];
          if (JSON.parse(newsa)['IsSuccess']) {
            this.get_viewroles();
            this.add_roles = {};
            this.GlobalService.disableloader();
            this.openSnackBar("Enter Successfully", "Close");
            //this.router.navigate(['/Homescreen/Manageroles']);
            // this.router.navigate(['/Homescreen/Master/Manageroles']);
          } else {
            this.openSnackBar("Retry! Entry Failed", "Close");
            this.GlobalService.disableloader();
          }
        })
      } else {
        // edit_roles_update
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/edit_roles_update', data).subscribe(resdata => {
          console.log(resdata);
          var newsa = resdata['_body'];
          if (JSON.parse(newsa)['IsSuccess']) {
            this.get_viewroles();
            this.disable_rolename=false;
            this.GlobalService.disableloader();
            this.openSnackBar("updated Successfully", "Close");
            this.add_roles = {};
            this.btn = "Add";
            //this.router.navigate(['/Homescreen/Manageroles']);
            // this.router.navigate(['/Homescreen/Master/Manageroles']);
          } else {
            this.disable_rolename=false;
            this.openSnackBar("Retry! Entry Failed", "Close");
            this.GlobalService.disableloader();
          }
        })
      }
    }

  }

  get_Roles() {
    this.GlobalService.enableloader();
    debugger;

    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_roles').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.btn = "Add";
        this.GlobalService.disableloader();
        debugger;
        var roo = JSON.parse(resdata['_body']);
        this.roles = roo.ResponseObject;
        console.log(this.roles);
      } else {
        this.GlobalService.disableloader();
      }
    })


  }
  cancel() {
    this.add_roles = {};
    this.btn = "Add";
    this.disable_rolename=false;
  }
  get_viewroles() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_viewroles').subscribe(resdata => {
      if (resdata) {
        var bodyrole = JSON.parse(resdata['_body']);
        this.viewRole = bodyrole.ResponseObject;
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_editviewrole(geteditdata) {
    console.log(geteditdata);
    this.btn = "Update";
    debugger;
    this.disable_rolename=true;
    // this.add_roles.userId = "";
    // this.add_roles.role = "";
    // this.edit_data = [];
    // console.log(geteditdata.roles_edit);
    // // this.items = geteditdata.roles_edit;
    // for (let k = 0; k < geteditdata.roles_edit.length; k++) {
    //   this.edit_data.push({
    //     "id": geteditdata.roles_edit[k].create_roles_id.toString(),
    //     "text": geteditdata.roles_edit[k].user_name
    //   });
    // }
    // this.add_roles.userId = this.edit_data;
    // this.add_roles.role = geteditdata.roles_name;



  //extra 29.03.18
  this.edit_data = [{"id":geteditdata.create_roles_id , "text":geteditdata.user_name}];
  this.add_roles.userId = this.edit_data;
  this.add_roles.role = geteditdata.roles;
  //end of 29.03.18

  }


  delete_role(deleterow,name : string){
    if(confirm("Are you sure to delete " + name)){
      deleterow.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/delete_roles_user', deleterow).subscribe(resdata => {
        debugger;
        var response = resdata['_body'];
        if (JSON.parse(response)['IsSuccess']) {
          debugger;
          this.get_viewroles();
          this.GlobalService.disableloader();
          this.openSnackBar("Delete Successfully", "Close");
        }
        else {
          debugger;
          this.GlobalService.disableloader();
          this.openSnackBar("Error! Please Retry", "Close");
        }
      })
    }
  }


}
