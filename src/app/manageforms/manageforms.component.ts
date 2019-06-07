import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-manageforms',
  templateUrl: './manageforms.component.html',
  styleUrls: ['./manageforms.component.css']
})
export class ManageformsComponent implements OnInit {
  formdata; login_details; DoctorsName; Departmentname; form; data_filter; form_name_old;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data_filter = {};
    this.form = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.get_forms();
    this.get_Departmet();
    this.get_DoctorsName();
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_forms() {
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_sampleforms').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.formdata = resdata;
        this.form_name_old = resdata;
        console.log(this.formdata);
      }
    })
  }

  deleteforms(getid,getname : string){
    if(confirm("Are you sure to delete Form " + getname)){
      var user_nr = this.login_details[0]['nr'];
      var getdata = {"formID" : getid , "nr" : user_nr};
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/delete_sampleforms' , getdata).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.get_forms();
          this.GlobalService.disableloader();
          this.openSnackBar("Delete Successfully", "Close");
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error!", "Close");
        }
      })
    }
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
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  get_DoctorsName() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      debugger;
      if (resdata) {
        debugger;
        this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
        debugger;
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  docname = [
    { value: '1', viewValue: 'Examination' },
    { value: '2', viewValue: 'History' }
  ];
  viewforms(data) {
    debugger;
    this.router.navigate(['/Homescreen/Detailmanageform', data]);
  }
  editforms(data) {
    debugger;
    this.router.navigate(['/Homescreen/Editform', data]);
  }

  cloneforms(data) {
    debugger;
    this.router.navigate(['/Homescreen/duplicateform', data.form_id]);
  }


  change_seqno(dataseq) {
    debugger;
 
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_mangeform_seqno', dataseq).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
  
      } else {
        this.GlobalService.disableloader();
  
      }
    })
  }

  update_filter(filter_data) {
    debugger;
    this.GlobalService.enableloader();
    if (filter_data.dept_id) {
      this.data_filter.name_formal = filter_data.dept_id.name_formal;
    } else {
      this.data_filter.name_formal = '';
    }
    if (filter_data.doctor) {
      this.data_filter.personell_nr = filter_data.doctor.personell_nr;
    } else {
      this.data_filter.personell_nr = '';
    }

    if (filter_data.sub_menu_id) {
      this.data_filter.sub_menu_id = filter_data.sub_menu_id.value;
    } else {
      this.data_filter.sub_menu_id = "";
    }

    if (filter_data.form_id) {
      this.data_filter.form_id = filter_data.form_id.form_id;
    } else {
      this.data_filter.form_id = '';
    }

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/getsampleform_filter', this.data_filter).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        debugger;
        this.formdata = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      } else {
        this.formdata = [];
        this.GlobalService.disableloader();
      }
    })
  }
  clear_search() {
    debugger;
    this.form = {};
    this.get_forms();
  }
}
