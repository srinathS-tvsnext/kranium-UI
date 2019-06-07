import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PreviewformComponent } from '../previewform/previewform.component';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addnewmanageform',
  templateUrl: './addnewmanageform.component.html',
  styleUrls: ['./addnewmanageform.component.css']
})
export class AddnewmanageformComponent implements OnInit {
  choice; choices; optioncc; lengthss; count; addic; deleteic; form; socialmentions; dd; socialmen = []; dialogRef;
  DoctorsName;Departmentname;historymaninName;logindata_details;preformdata;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.logindata_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.choice = {};
    this.form = {}
    this.choices = [{ id: 1, q_name: '', a_type: '', c_length: '', o_count: '', lengthss: false, count: false, optioncc: [], addbtn: 0 }];
    this.optioncc = [];
    this.deleteic = true;
    this.addic = false;
    this.socialmen = [];
    this.get_DoctorsName();
    this.get_Departmet();
    this.get_historyfomname();
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_Departmet() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_investifation_department_masters').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.Departmentname = resdata['ResponseObject'];
        console.log(this.Departmentname);
      }else{
        this.GlobalService.disableloader();
      }
    })
  }
  addnew() {
    if (this.choices.length >= 1) {
      this.addic = false;
      this.deleteic = false;
    }
    var newItemNo = this.choices.length + 1;
    this.choices.push({ id: newItemNo, q_name: '', a_type: '', c_length: '', o_count: '', lengthss: false, count: false, optioncc: [], addbtn: 1 });
    this.lengthss = false;
    this.count = false;
  }

  delete(choice) {
    if (this.choices.length <= 2) {
      this.addic = false;
      this.deleteic = true;
    }
    for (var i = 0; i < this.choices.length; i++) {
      if (this.choices[i]['id'] === choice['id']) {
        this.choices.splice(i, 1);
        break;
      }
    }
  }






  answertypeval(val, choice) {
    debugger;
    if (val == '1' || val == '2') {
      choice.lengthss = true;
      choice.count = false;
    }
    else if (val == '3' || val == '4' || val == '5') {
      choice.count = true;
      choice.lengthss = false;
    } else {
      choice.lengthss = false;
      choice.count = false;
    }
  }


  save(savedata, formdata) {
    debugger;
    var socialmen = [];
    if (this.logindata_details) {
      for (var i = 0; i < this.logindata_details.length; i++) {
        formdata.User_name = this.logindata_details[i].User_name;
        formdata.nr = this.logindata_details[i].nr;
      }
    }
    socialmen.push(savedata, formdata);
    if(formdata.f_name && (formdata.dept_id || formdata.doctor) && formdata.sub_menu_id && savedata[0]['q_name'] && savedata[0]['a_type'] != ""){
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/addform', socialmen).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        console.log(resdata['ResponseObject']);
        this.socialmentions = resdata['ResponseObject'];
        this.openSnackBar("Save Successfully", "Close");
        this.router.navigate(['/Homescreen/Manageforms']);
      }
    })
  }else{
     this.openSnackBar("Please Enter the all Details", "Close");
  }
  }


  preview(savedata, formdata): void {

    debugger;
    var socialmen = [];
    if (this.logindata_details) {
      for (var i = 0; i < this.logindata_details.length; i++) {
        formdata.User_name = this.logindata_details[i].User_name;
        formdata.nr = this.logindata_details[i].nr;
      }
    }
    socialmen.push(savedata, formdata);
    if(formdata.f_name && formdata.dept_id && formdata.doctor && formdata.sub_menu_id && savedata[0]['q_name'] && savedata[0]['a_type'] != ""){
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/previewform', socialmen).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.preformdata = resdata['ResponseObject'];
        this.preview_row(this.preformdata);
        this.openSnackBar("Save Successfully", "Close");
      }
    })
  }else{
     this.openSnackBar("Please Enter the all Details", "Close");
  }
  }

  preview_row(predata){

    this.dialogRef = this.dialog.open(PreviewformComponent, {
      data: {
        get_detail: predata,
      },
      disableClose: false
    })
  }

  get_DoctorsName() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata=>{
      debugger;
      if(resdata){
        debugger;
        this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
        debugger;
      }else{
        this.GlobalService.disableloader();
      }
    })
  }
  

  get_historyfomname() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/gethistory_form_name').subscribe(resdata=>{
      debugger;
      if(resdata){
        debugger;
        this.GlobalService.disableloader();
        this.historymaninName = resdata['ResponseObject'];
        debugger;
      }else{
        this.GlobalService.disableloader();
      }
    })
  }
  valuechange(choice) {
    debugger;

    if (choice.o_count != null && choice.o_count != 0) {
      for (var i = 1; i <= choice.o_count; i++) {
        debugger;
        choice.optioncc.push({ id: "new" + i });
      }
      console.log(choice.optioncc);
    }
    else {
      choice.optioncc = [];
    }
  }


  menus = [
    { value: 'steak-0', viewValue: 'Appointments' },
    { value: 'pizza-1', viewValue: 'Service Rendered' },
    { value: 'tacos-2', viewValue: 'Manage Favourites' },
    { value: 'umm-2', viewValue: 'Manage Roles' },
    { value: 'umm-2', viewValue: 'Manage Forms' },
    { value: 'umm-2', viewValue: 'Logout' }
  ];

  submenus = [
    { value: 'steak-0', viewValue: 'Past Encounter' },
    { value: 'pizza-1', viewValue: 'Vitals' },
    { value: 'tacos-2', viewValue: 'Prescription' },
    { value: 'umm-2', viewValue: 'Diagnosis' },
    { value: 'umm-2', viewValue: 'Investigation' },
    { value: 'umm-2', viewValue: 'Report' },
    { value: 'umm-2', viewValue: 'Follow-ups' }

  ];

  testfield = [
    { value: '1', viewValue: 'Text Box' },
    { value: '2', viewValue: 'Text Area' },
    { value: '3', viewValue: 'Radio Button' },
    { value: '4', viewValue: 'Check Box' },
    { value: '5', viewValue: 'Drop Down' }
  ];


  docname = [
    { value: '1', viewValue: 'Examination' },
    { value: '2', viewValue: 'History' }
  ];




}
