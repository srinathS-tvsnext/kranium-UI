import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvestigationlistComponent } from '../investigationlist/investigationlist.component';
import { InvestigationTemplateComponent } from '../investigation-template/investigation-template.component';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.css']
})
export class InvestigationComponent implements OnInit {
  Investigation_patient; date_status;
  dialogRef; Investigation_template; fav_invest; Investigation_template_category; Investigation; categorylist_array; invest_caterogyname;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  Investigation_category; array_investi_temperary; array_investi_temperary_favadd; hidden; patientdata_details;
  newarray; investigation_kranium_list; login_details; acess_rights; dept_hidden; Investigation_menu; hiddengif; datevalidation;
  investigation_data;
  checkbox_hdn_data = true;
  button_hdn_data = false;
  editbtn_hdn = false;
  cancelbtn_hdn = true;
  ngOnInit() {
    // console.log(this.GlobalService.user_access_rights);
    // this.acess_rights = this.GlobalService.user_access_rights;
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.fav_invest = {}
    this.get_investigation_template();
    this.get_Investigation();
    this.categorylist_array = [];
    this.hidden = true;
    this.hiddengif = true;
    this.dept_hidden = true;
    this.get_last_investigation(this.patientdata_details);
    this.get_investigation_data();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  get_last_investigation(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_last_investigation', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.Investigation_patient = resdata['ResponseObject'];
        console.log(this.Investigation_template_category);
      }
    })
  }
  get_investigation_template() {
    this.GlobalService.enableloader();
    debugger;
    // get_fav_investigation_template
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_fav_investigation_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.Investigation_template = resdata['ResponseObject'];
        console.log(this.Investigation_template);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  edit_investigation_temp(data) {
    // this.hidden=false;
    this.GlobalService.enableloader();
    debugger;
    // get_fav_investigation_list
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_fav_investigation_list', data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        console.log();
        this.Investigation_template_category = resdata['ResponseObject'];
        console.log(this.Investigation_template_category);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  foods = [
    { value: 'steak-0', viewValue: 'Favourite 1' },
    { value: 'pizza-1', viewValue: 'Favourite 2' },
    { value: 'tacos-2', viewValue: 'Favourite 3' },
    { value: 'umm-2', viewValue: 'Favourite 4' }
  ];

  investigationlist(): void {
    this.dialogRef = this.dialog.open(InvestigationlistComponent, {
      data: {
        width: '600px',
      },
      disableClose: true
    })
  }
  //Investigation_list_componenet
  //Investigation List
  // get_investifation_department_masters
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

  get_Investigation() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_investifation_department_masters').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.Investigation = resdata['ResponseObject'];
        console.log(this.Investigation);
      } else {
        this.GlobalService.disableloader();
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }
  get_Investigation_category_list(data_invest_id) {
    this.hidden = false;
    this.GlobalService.enableloader();
    // this.Investigation_template_category=[];
    debugger;
    var id = data_invest_id.nr
    this.invest_caterogyname = data_invest_id.name_formal;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_investifation_masters', id).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.Investigation_category = resdata['ResponseObject'];

      } else {
        this.GlobalService.disableloader();
      }
      // routerLink='/Homescreen/Patientlist'
    })


  }


  create_category_list(vreate_categorylist) {
    var index = -1;
    var val = vreate_categorylist.item_code;
    var filteredObj = this.categorylist_array.find(function (item, i) {
      if (item.item_code === val) {
        index = i;
      }
    });
    //console.log(index, filteredObj);
    if (index != -1) {
      this.categorylist_array.splice(index, 1);
    }
    else {
      if (vreate_categorylist.checkbox) {
        this.dept_hidden = false;
        this.categorylist_array.push(vreate_categorylist);
        // console.log(this.categorylist_array);
      
        //distinct check
        if(this.Investigation_template_category){
          for(var i = 0; i < this.Investigation_template_category.length; i++) {
            for(var j = 0; j < this.Investigation_template_category[i].question.length; j++){
              if(this.Investigation_template_category[i].question[j].item_code == vreate_categorylist.item_code ){
                this.openSnackBar("This Procedure is Already Raised , Please Select Another One", "Close");
                vreate_categorylist.checkbox=false;
                this.categorylist_array.splice(-1);
              }else{ } 
            } 
          }
        }
        //End of distinct check
        
      }

    }
  }


  clrprocedure() {
    this.Investigation_menu = [];
    this.hiddengif = true;
    this.hidden = true;
  }

  remove_temp(rem_cat) {
    debugger;
    if (this.Investigation_category) {
      for (var i = 0; i < this.categorylist_array.length; i++) {
        if (this.categorylist_array[i].item_code == rem_cat.item_code) {
          this.categorylist_array.splice(i, 1);
          for (var j = 0; j < this.Investigation_category.length; j++) {
            if (this.Investigation_category[j].item_code == rem_cat.item_code) {
              this.Investigation_category[j].checkbox = false;
            }
          }
        }
      }
    }

  }

  removeall() {
    this.Investigation_template_category = [];
  }

  remove_old_tempdata_investigation(old_temp_data) {
    debugger;
    if (this.Investigation_template_category) {
      for (var i = 0; i < this.Investigation_template_category.length; i++) {
        for (var j = 0; j < this.Investigation_template_category[i].question.length; j++) {
          if (this.Investigation_template_category[i].question[j].item_code == old_temp_data.item_code) {
            // this.Investigation_category[i].checkbox = false;
            this.Investigation_template_category[i].question.splice(j, 1);
          }
        }
      }
      console.log(this.Investigation_template_category);
      // for (var j = 0; j < this.Investigation_category.length; j++) {
      //   if (this.Investigation_category[j].item_code == rem_cat.item_code) {
      //     this.Investigation_category[j].checkbox = false;
      //   }
      // }
    }
  }
  save_investigation(data, data_edit) {
    debugger;
    this.array_investi_temperary_favadd = [];
    if (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].checkbox) {
          this.array_investi_temperary_favadd.push(data[i]);
        }
      }
    }
    if (data_edit) {
      for (var j = 0; j < data_edit.length; j++) {
        for (var k = 0; k < data_edit[j].question.length; k++) {
          this.array_investi_temperary_favadd.push(data_edit[j].question[k]);
        }
      }
    }
    // console.log(this.array_investi_temperary_favadd);
    if (this.array_investi_temperary_favadd.length != 0) {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_fav_Inestigation_catogory', this.array_investi_temperary_favadd).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.hidden = true;
          this.categorylist_array = [];
          this.dept_hidden = true;
          this.GlobalService.disableloader();
          this.openSnackBar("Saved Successfully", "Close");
          debugger;
          console.log(resdata['ResponseObject']);
          var data_id = resdata['ID'];
          this.dialogRef = this.dialog.open(InvestigationTemplateComponent, {
            data: {
              Id: data_id
            },
            disableClose: false
          })
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error! , Please Retry", "Close");
        }
      })
    }
  }

  save_normal_investigation(data, data_edit) {
    debugger;
    this.array_investi_temperary = [];
    if (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].checkbox) {
          data[i].encounter_no = this.patientdata_details[0]['EncounterNo'];
          data[i].uhid = this.patientdata_details[0]['UHIDNO'];
          data[i].nr = this.login_details[0]['nr'];
          this.array_investi_temperary.push(data[i]);
        }
      }
    }
    if (data_edit) {
      for (var j = 0; j < data_edit.length; j++) {
        for (var k = 0; k < data_edit[j].question.length; k++) {
          data_edit[j].question[k].encounter_no = this.patientdata_details[0]['EncounterNo'];
          data_edit[j].question[k].uhid = this.patientdata_details[0]['UHIDNO'];
          data_edit[j].question[k].nr = this.login_details[0]['nr'];
          this.array_investi_temperary.push(data_edit[j].question[k]);
        }
      }
    }
    // var enc_no = this.patientdata_details[0]['EncounterNo'];
    // var uhid = this.patientdata_details[0]['UHIDNO'];
    // var nr = this.login_details[0]['nr'];
    // var pat_detail = { encounter_no: enc_no, uhid: uhid, nr: nr };

    // this.array_investi_temperary.push(pat_detail);
    console.log(this.array_investi_temperary);
    if (this.array_investi_temperary.length != 0) {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_patient_investigation', this.array_investi_temperary).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.hidden = true;
          this.categorylist_array = [];
          this.dept_hidden = true;
          this.get_investigation_data();
          this.openSnackBar("Added Successfully..!", "Close");
          this.GlobalService.disableloader();
          debugger;
          console.log(resdata['ResponseObject']);
        } else {
          this.openSnackBar("Error! , Please Retry", "Close");
          this.GlobalService.disableloader();
        }
      })
    }
  }

  //autosearch api
  get_medicine_kranium_list_gen(data_con) {
    debugger;
    this.hiddengif = false;
    if (data_con.length > 2) {
      this.newarray = { "searchdata": data_con }; this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_all_investigation_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.hidden = false;
          this.hiddengif = true;
          this.Investigation_category = resdata['ResponseObject'];
          this.active_checkbox(this.Investigation_category);
          //searchbox style class add
          var invlist = this.Investigation_category;
          if(invlist.length < 10){
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.add("myboxsize");
          }else{
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.remove("myboxsize");
          }
          //end of searchbox style class
        } else {
          this.hiddengif = false;
          this.Investigation_category = [];
          // this.GlobalService.disableloader();
        }
      });
    } else {
      this.hiddengif = true;
      if (data_con.length < 1) {
        this.hidden = true;
        this.Investigation_category = [];
      }
    }
  }

//extra flow procedure raised
  get_investigation_data() {
    var enc_no = this.patientdata_details[0].EncounterNo;
    var mydata = {'encounter_no': enc_no };
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_investigation_data', mydata).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.investigation_data = resdata['ResponseObject'];
        this.active_checkbox(this.investigation_data);
        this.GlobalService.disableloader();
      }
      else {
        this.investigation_data = [];
        this.GlobalService.disableloader();
      }

    })
  }
  delete_investigation_data(delete_data){
    console.log(delete_data);
    if(confirm("Are you sure delete "+ delete_data.item_long_description)){
      delete_data.nr = this.login_details[0]['nr'];
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/delete_investigation_data', delete_data).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.get_investigation_data();
          this.openSnackBar("Delete Successfully..!", "Close");
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error! , Please Retry", "Close");
        }
      })
    }
  }
  edit_investigation_data(active_data){
    console.log(active_data);
    
    this.checkbox_hdn_data = false;
    this.button_hdn_data = true;
    this.editbtn_hdn = true;
    this.cancelbtn_hdn = false;
    console.log(active_data);
    for(var i = 0; i < active_data.length; i++){
      active_data[i].checkbox = true;
    }
  }
  cancel_investigation_data(){
    this.checkbox_hdn_data = true;
    this.button_hdn_data = false;
    this.editbtn_hdn = false;
    this.cancelbtn_hdn = true;
  }
  active_checkbox(investigation_item) {
    var act_item = this.investigation_data;
    debugger;
    for(var i =  0; i < investigation_item.length; i++){
      for(var j = 0; j < this.investigation_data.length; j++){
        if (investigation_item[i].item_code == this.investigation_data[j].item_code) {
          debugger;
          investigation_item[i].checkbox = true;
        }
      }
    }
  }
  //end of extra flow procedure raised


}
