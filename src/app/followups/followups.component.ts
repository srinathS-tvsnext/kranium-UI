import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-followups',
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.css']
})
export class FollowupsComponent implements OnInit {
  disabledfun; id_surgery;
  Departmentname;
  SurgeryType;
  DoctorsName;
  dat = {};
  data = {};
  patientdata_details;
  surgerylist;
  refferal_details;
  login_details; datevalidation; get_follow;

  Investigation_category; newarraysss; hidden; categorylist_array; hiddengif;
  Investigation_menu;
  formusers_drop; showGreeting; exampleDatas; items;date_status;

  options = [
    { value: '1 Month', viewValue: '1 Month' },
    { value: '2 Months', viewValue: '2 Months' },
    { value: '6 Months', viewValue: '6 Months' },
    { value: 'Custom Date', viewValue: 'Custom Date' }
  ];

  editfunction(data) {
    if (data.ftype == "Custom Date") {
      this.disabledfun = 'false';
    } else {
      this.disabledfun = 'true';
    }
    debugger;
  }

  public editor;
  public editorContent = ``;
  public editorOptions = {
    placeholder: "Hello Globals..."
  };
  onEditorBlured(quill) {
    // console.log('editor blur!', quill);
  }
  onEditorFocused(quill) {
    // console.log('editor focus!', quill);
  }
  onEditorCreated(quill) {
    this.editor = quill;
    // console.log('quill is ready! this is current quill instance object', quill);
  }
  onContentChanged({ quill, html, text }) {
    // console.log('quill content is changed!', quill, html, text);
  }

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.data["riat"] = "Not Recommend";
    this.id_surgery = [];
    this.disabledfun = 'true';
    this.get_Departmet();
    this.get_DoctorsName();

    // this.get_SurgeryType();
    //this.exampleDatas = [];

    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    console.log(this.patientdata_details);
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);

    //this.get_surgery(this.patientdata_details);
    this.get_refferal_details(this.patientdata_details);
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));

    //search procedure
    this.categorylist_array = [];
    this.hidden = true;
    this.hiddengif = true;
    this.viewusers();
    this.exampleDatas = [];

    this.get_followups(this.patientdata_details);
    this.get_surgery(this.patientdata_details);
  }

  get_followups(patientdata_details) {
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_followups', patientdata_details).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.get_follow = resdata['ResponseObject'];
        console.log(this.get_follow);
      } else {
        this.GlobalService.disableloader();
      }

    })
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  //multi select box
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
  //End of multi select box


  viewusers() {
    debugger;
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_followups_conslt_doctor').subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        // var data_custom = JSON.parse(resdata['_body']);
        // this.formusers_drop = [];
        // this.formusers_drop = data_custom['ResponseObject'];
        this.formusers_drop = resdata['ResponseObject'];
        if (this.formusers_drop) {
          for (var i = 0; i < this.formusers_drop.length; i++)
            this.formusers_drop[i].id = i + 1;
        }
        this.showGreeting = true;
        for (let k = 0; k < this.formusers_drop.length; k++) {
          this.exampleDatas.push({
            "id": this.formusers_drop[k].id.toString(),
            "text": this.formusers_drop[k].doctor_name
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


  user_sms(dat) {
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_user_sms', dat).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Sms Send Successfully", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Please assign correct Doctor name in Department Name", "Close");
      }

    })
  }

  get_Departmet() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_followups_conslt_department').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.Departmentname = resdata['ResponseObject'];
        console.log(this.Departmentname);
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  get_SurgeryType() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_api_surgeorylist').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.SurgeryType = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_DoctorsName() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_users_doctor').subscribe(resdata => {
      if (resdata) {
        this.GlobalService.disableloader();
        this.DoctorsName = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  slots = [
    { value: '1', viewValue: 'Slot 9:30' },
    { value: '2', viewValue: 'Slot 10:00' },
    { value: '3', viewValue: 'Slot 10:30' },
    { value: '4', viewValue: 'Slot 11:00' },
    { value: '5', viewValue: 'Slot 11:30' },
    { value: '6', viewValue: 'Slot 12:00' },
    { value: '7', viewValue: 'Slot 12:30' },
    { value: '8', viewValue: 'Slot 01:00' },
    { value: '9', viewValue: 'Slot 02:30' },
    { value: '10', viewValue: 'Slot 03:00' },
    { value: '11', viewValue: 'Slot 03:30' },
    { value: '12', viewValue: 'Slot 04:00' },
    { value: '13', viewValue: 'Slot 04:30' }
  ];


  // it is old add surgery function
  // savesurgery(data) {
  //   data.encounter_no = this.patientdata_details[0]['EncounterNo'];
  //   data.uhid_no = this.patientdata_details[0]['UHIDNO'];
  //   data.nr = this.login_details[0]['nr'];

  //   this.GlobalService.enableloader();
  //   this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/add_surgery', data).subscribe(resdata => {
  //     debugger;
  //     if (resdata['IsSuccess']) {
  //       this.GlobalService.disableloader();
  //       this.id_surgery.push(resdata['ResponseObject']);
  //       console.log(this.id_surgery);
  //       this.get_surgery(this.patientdata_details);
  //       this.openSnackBar("Save Successfully", "Close");
  //     }
  //     else {
  //       this.GlobalService.disableloader();
  //       this.openSnackBar("Some Error! Retry", "Close");
  //     }

  //   })
  // }

  delete_surgery(deletedata) {
    this.GlobalService.enableloader();
    deletedata.nr = this.login_details[0]['nr'];
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/delete_surgery', deletedata).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.get_surgery(this.patientdata_details);
        this.GlobalService.disableloader();
        this.openSnackBar("Delete Successfully", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }
    })
  }

  savefollowup(data) {
    data.patient_name = this.patientdata_details[0]['First_name'];
    data.patient_phone = this.patientdata_details[0]['Phone'];
    data.patient_address = this.patientdata_details[0]['Address'];
    data.encounter_no = this.patientdata_details[0]['EncounterNo'];
    data.uhid_no = this.patientdata_details[0]['UHIDNO'];
    data.id = this.id_surgery;
    data.nr = this.login_details[0]['nr'];
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/follow_up_details', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.get_refferal_details(this.patientdata_details);
        this.openSnackBar("Save Successfully", "Close");
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }
    })
  }
  get_surgery(data) {
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_surgerylist', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.surgerylist = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }
      else {
        this.surgerylist = [];
        this.GlobalService.disableloader();
      }

    })
  }

  get_refferal_details(data) {
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/get_refferal_details', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.refferal_details = resdata['ResponseObject'];
        console.log(this.refferal_details);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }

    })
  }


  //procedure search
  get_medicine_kranium_list_gen(data_con) {
    debugger;
    this.hiddengif = false;
    if (data_con.length > 2) {
      // this.GlobalService.enableloader();
      this.newarraysss = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_all_investigation_list', this.newarraysss).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          this.Investigation_category = resdata['ResponseObject'];
          this.hidden = false;
          this.hiddengif = true;
          var invlist = this.Investigation_category;
          if(invlist.length < 10){
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.add("myboxsize");
          }else{
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.remove("myboxsize");
          }
          // this.GlobalService.disableloader();
        } else {
          this.hiddengif = false;
          // this.GlobalService.disableloader();
        }
      })
    } else {
      this.hiddengif = true;
      if (data_con.length < 1) {
        this.hidden = true;
      }

    }
  }
  //End of procedure search


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
        this.categorylist_array.push(vreate_categorylist);
        // console.log(this.categorylist_array);
        
        //distinct check
        for(var i = 0; i < this.surgerylist.length; i++) {
          if(this.surgerylist[i].item_code == vreate_categorylist.item_code ){
            this.openSnackBar("This Procedure is Already Raised , Please Select Another One", "Close");
            vreate_categorylist.checkbox=false;
            this.categorylist_array.splice(-1);
          }else{ }
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

  save_surgery_procedure(data_procedure) {
    console.log(data_procedure);
    this.GlobalService.enableloader();
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data_procedure.uhid_no = this.patientdata_details[i].UHIDNO;
        data_procedure.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }
    var nr = this.login_details[0]['nr'];
    var newarray = { "nr": nr, "surgery": data_procedure, "uhid_no": data_procedure.uhid_no, "encounter_no": data_procedure.encounter_no };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/add_surgery', newarray).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.hidden = true;
        this.categorylist_array = [];
        this.Investigation_menu = [];
        this.openSnackBar("Save Successully", "Close");
        this.get_surgery(this.patientdata_details);
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error? not added", "Close");
      }
    })

  }
  //End of procedure search

  printPreview() {

    if (!this.refferal_details) {
      this.openSnackBar("No Data Found", "Close");
    } else {
      var toPrint = document.getElementById('printSectionId');
      var popupWin = window.open('', '_blank', 'width=800,height=600,location=no,left=200px');
      popupWin.document.open();
      popupWin.document.write('<html><head><style>@page {margin-top: 5cm;margin-bottom: 1cm;margin-left: 2.5cm;margin-right: 1.5cm;} .col-md-12{width:100%;float:left;}.row{width:100%;float:left;}.sign{float:right;}.doct_sign{float:right;}.aligntext{padding-left: 50px;}</style><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></head><body onload="window.print()">')
      popupWin.document.write(toPrint.innerHTML);
      popupWin.document.write('</body></html>');
      popupWin.document.close();
    }
  }

}
