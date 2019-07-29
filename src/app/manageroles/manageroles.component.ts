import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manageroles',
  templateUrl: './manageroles.component.html',
  styleUrls: ['./manageroles.component.css']
})
export class ManagerolesComponent implements OnInit {
  dialogRef; socialmentions; form; social_sub_menu; social_sub_views; array;
  Departmentname; RolesName; items; exampleDatas; showGreeting; social_sub_menu_con; acess_rights;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.menu();
    this.form = {};
    this.get_Departmet();
    this.get_Roles();
    this.exampleDatas = [];
    this.submenu();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

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

  menus = [
    { value: 'steak-0', viewValue: 'Menu Type 1' },
    { value: 'pizza-1', viewValue: 'Menu Type 2' },
    { value: 'tacos-2', viewValue: 'Menu Type 3' },
    { value: 'umm-2', viewValue: 'Menu Type 4' }
  ];

  submenus = [
    { value: 'steak-0', viewValue: 'Sub Menu Type 1' },
    { value: 'pizza-1', viewValue: 'Sub Menu Type 2' },
    { value: 'tacos-2', viewValue: 'Sub Menu Type 3' },
    { value: 'umm-2', viewValue: 'Sub Menu Type 4' }
  ];

  subviews = [
    { value: 'steak-0', viewValue: 'Subview 1' },
    { value: 'pizza-1', viewValue: 'Subview 2' },
    { value: 'tacos-2', viewValue: 'Subview 3' },
    { value: 'umm-2', viewValue: 'Subview 4' }
  ];
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  get_Departmet() {
    this.GlobalService.enableloader();    
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_investifation_department_masters').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();        
        this.Departmentname = resdata['ResponseObject'];
        console.log(this.Departmentname);
        this.showGreeting = true;
        for (let k = 0; k < this.Departmentname.length; k++) {
          this.exampleDatas.push({
            "id": this.Departmentname[k].nr.toString(),
            "text": this.Departmentname[k].name_formal
          });
        }
        this.items = this.exampleDatas;
      } else {
        this.GlobalService.disableloader();
      }
    });
  }

  get_Roles() {
    this.GlobalService.enableloader();    
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_roles').subscribe(resdata => {      
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();        
        this.RolesName = resdata['ResponseObject'];
        console.log(this.RolesName);
      } else {
        this.GlobalService.disableloader();
      }
    });
  }

  menu() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_menu').subscribe(resdata => {      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.socialmentions = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    });
  }
  submenu() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_submenu').subscribe(resdata => {      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.social_sub_menu = resdata['ResponseObject'];
        this.social_sub_menu_con = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    });
  }
  subview(data) {
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Manageroles/get_subview', data).subscribe(resdata => {      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.social_sub_views = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  save(role, data) {    
    this.GlobalService.enableloader();
    this.array = { "acces": data, "roles_name": role };    
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/add_roles', this.array).subscribe(resdata => {      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error ! Retry", "Close");
      }
    });
    // add_roles
  }

  get_role_permission(data) {    
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_access_permission', data).subscribe(resdata => {      
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.social_sub_menu = JSON.parse(resdata['ResponseObject'][0].access_rights);
        console.log(this.social_sub_menu);
      } else {
        this.GlobalService.disableloader();
        this.social_sub_menu = this.social_sub_menu_con;
      }
    });
  }
}
