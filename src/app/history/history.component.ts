import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

const NUMBER_REGEX = /^[0-9]*$/;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  date_status;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  formdatacr; search; autocomp; formdata; opttextnew; arrray; response; autocomps; hide; show; history; dragedobj;
  history_patient_chief_complaints; patientdata_details; data_temp; pat_form_data_id; login_details; acess_rights;
  array; formdatacr_history; history_answer; ffresdata; datevalidation; btn_sav;
  ngOnInit() {
    this.btn_sav = "save";
    // this.acess_rights = this.GlobalService.user_access_rights;

    // datestatus
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.viewfor();
    this.formdata = {};
    this.opttextnew = {};
    this.arrray = [];
    this.hide = true;
    this.show = false;
    this.history = {};
    this.get_chief_complaints_patient_details(this.patientdata_details);
    this.dragedobj = 0;
    this.get_history_qa(this.patientdata_details);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  numberFormControl = new FormControl('', [
    // Validators.required,
    Validators.pattern(NUMBER_REGEX)
    ]
  );
  

  daytype = [{ "type": "Day" }, { "type": "Week" }, { "type": "Month" }];
  drag_div(data_drag, index_dd) {
    this.dragedobj = index_dd;
    // debugger;
  }
  drop_div(data_drop, index, dataobbb) {
    debugger
    // this.dragedobj
    var new_data_custom = dataobbb[index];
    dataobbb[index] = dataobbb[this.dragedobj];
    dataobbb[this.dragedobj] = new_data_custom;
  }

  dragover(data_dragover) {
    // debugger
    return false;
  }
  viewfor() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_formsorg_mageform').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.GlobalService.disableloader();
        debugger;
        this.formdatacr = resdata;
        for (var i = 0; i < this.formdatacr.length; i++) {
          debugger;
          if (this.formdatacr[i].quer) {
            // this.formdatacr[i].quer = this.formdatacr[i].quer[0].form_id;
            this.view_histroy([this.formdatacr[i].quer[0].form_id], this.formdatacr[i].history_main_form_name_id);
            var daa = [this.formdatacr[i].quer[0].form_id];
            this.formdatacr[i].Fromopt = daa;
          }
        }
        console.log(this.formdatacr);
      } else {
        this.GlobalService.disableloader();
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }

  duration_value() {
    this.GlobalService.disableloader();
    this.autocomps = [{ 'chief_complaints': "day" }, { 'chief_complaints': "week" }, { 'chief_complaints': "month" }];
  }
  get_history_qa(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_history_qa', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.history_answer = resdata['ResponseObject'];
        console.log(this.history_answer);

        if (this.history_answer.length == 0) {
          this.btn_sav = "save";
        } else {
          this.btn_sav = "Update";
        }
      }
    })
  }
  view_histroy(data, his_id) {
    if (data.length != 0) {
      debugger;
      this.GlobalService.enableloader();
      this.array = { 'data': data };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/getformdetailview_exam', this.array).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata) {
          this.GlobalService.disableloader();
          debugger;
          this.ffresdata = resdata;
          if (this.history_answer) {
            for (var p = 0; p < this.ffresdata.length; p++) {
              for (var k = 0; k < this.ffresdata[p].question.length; k++) {
                for (var t = 0; t < this.history_answer.length; t++) {
                  if (this.ffresdata[p].question[k].question_id == this.history_answer[t].question_id) {

                    if (this.ffresdata[p].question[k].options_type == "1" || this.ffresdata[p].question[k].options_type == "2" || this.ffresdata[p].question[k].options_type == "5") {
                      this.ffresdata[p].question[k].answer = this.history_answer[t].answer;
                      this.ffresdata[p].question[k].add_history_dynamicform_id = this.history_answer[t].add_history_dynamicform_id;
                    }
                    else if (this.ffresdata[p].question[k].options_type == "3") {
                      // this.ffresdata[p].question[k].answer
                      this.ffresdata[p].question[k].add_history_dynamicform_id = this.history_answer[t].add_history_dynamicform_id;
                      for (var j = 0; j < this.ffresdata[p].question[k].question_option.length; j++) {
                        this.ffresdata[p].question[k].answer = this.history_answer[t].answer;
                      }
                    } else if (this.ffresdata[p].question[k].options_type == "4") {
                      this.ffresdata[p].question[k].add_history_dynamicform_id = this.history_answer[t].add_history_dynamicform_id;
                      for (var j = 0; j < this.ffresdata[p].question[k].question_option.length; j++) {
                        this.ffresdata[p].question[k].question_option[j].answer = this.history_answer[t].answer;
                      }
                    }
                  }
                }
              }
            }
          }



          for (var i = 0; i < this.formdatacr.length; i++) {
            if (this.formdatacr[i].history_main_form_name_id == his_id) {
              this.formdatacr[i][this.formdatacr[i].history_main_form_name] = resdata;
            }
          }
          console.log(this.formdatacr);
          
          // this.formdatacr_history = resdata;
          // console.log(this.formdatacr_history);
        }
        else {
          this.GlobalService.disableloader();
        }
        // routerLink='/Homescreen/Patientlist'
      })
    } else {
      for (var i = 0; i < this.formdatacr.length; i++) {
        if (this.formdatacr[i].history_main_form_name_id == his_id) {
          this.formdatacr[i][this.formdatacr[i].history_main_form_name] = [];
        }
      }
    }
  }
  valuechange(data) {
    this.GlobalService.enableloader();
    debugger;
    console.log(data);
    this.search = { "search": data };
    var inte = data.match(/\d+/g)
    if (inte) {
      this.hide = false;
      this.show = true;
      // show
      this.GlobalService.disableloader();
      this.autocomps = [{ 'chief_complaints': "day" }, { 'chief_complaints': "week" }, { 'chief_complaints': "month" }];
    } else {
      this.hide = true;
      this.show = false;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getchief_complaints', this.search).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          this.autocomp = resdata['ResponseObject'];
          console.log(this.autocomp);
        } else {
          this.GlobalService.disableloader();
        }
        // routerLink='/Homescreen/Patientlist'
      })
    }
  }
  save(optte) {
    this.GlobalService.enableloader();
    debugger;
    if (this.btn_sav == "Save") {
      console.log(optte);
      var testarray = [];
      for (var i = 0; i < this.patientdata_details.length; i++) {
        optte.forEach(newObj => {
          console.log(newObj[newObj.history_main_form_name]);
          if (newObj[newObj.history_main_form_name]) {
            newObj[newObj.history_main_form_name].forEach(formObj => {
              formObj['question'].forEach(questionObj => {
                if (questionObj['options_type'] == '1' || questionObj['options_type'] == '2' || questionObj['options_type'] == '5' || questionObj['options_type'] == '3') {
                  console.log("question", questionObj['name']);
                  console.log("answer", questionObj['answer']);
                  testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': questionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'] });
                } else {
                  console.log("question", questionObj['name']);
                  questionObj['question_option'].forEach(optionObj => {
                    if (optionObj['answer']) {
                      console.log("Answer", optionObj['options']);
                      testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': optionObj['options'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'] });
                    }
                  });
                }
              });
            });
          }
        });
      }
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/add_dynamic_history', testarray).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.btn_sav = "Update";
          this.GlobalService.disableloader();
          this.openSnackBar("Save Successfully", "Close");
          debugger;
          this.response = resdata['ResponseObject'];
          console.log(this.response);
        } else {
          this.btn_sav = "Save";
          this.GlobalService.disableloader();
          this.openSnackBar("Error! Please Choose Atleast One Form", "Close");

        }
      })
    } else {
      var testarray = [];
      for (var i = 0; i < this.patientdata_details.length; i++) {
        optte.forEach(newObj => {
          console.log(newObj[newObj.history_main_form_name]);
          if (newObj[newObj.history_main_form_name]) {
            newObj[newObj.history_main_form_name].forEach(formObj => {
              formObj['question'].forEach(questionObj => {
                if (questionObj['options_type'] == '1' || questionObj['options_type'] == '2' || questionObj['options_type'] == '5' || questionObj['options_type'] == '3') {
                  console.log("question", questionObj['name']);
                  console.log("answer", questionObj['answer']);
                  testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': questionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'], 'add_history_dynamicform_id': questionObj['add_history_dynamicform_id'] });
                } else {
                  console.log("question", questionObj['name']);
                  questionObj['question_option'].forEach(optionObj => {
                    if (optionObj['answer']) {
                      console.log("Answer", optionObj['options']);
                      testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': optionObj['options'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'], 'add_history_dynamicform_id': questionObj['add_history_dynamicform_id'] });
                    }
                  });
                }
              });
            });
          }
        });
      }
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/updatedynamichistory', testarray).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.btn_sav = "Update";
          this.GlobalService.disableloader();
          this.openSnackBar("Save Successfully", "Close");
          debugger;
          // this.response = resdata['ResponseObject'];
          // console.log(this.response);
        } else {
          this.btn_sav = "Update";
          this.GlobalService.disableloader();
          this.openSnackBar("Error! Please Choose Atleast One Form", "Close");

        }
      })

    }

  }




  save_chief_complaints(data) {
    debugger;

    this.data_temp = { 'chief_complaints': data.chief_complaints, 'duration': data.duration, 'dur_num': data.dur_num };
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        this.data_temp.UHIDNO = this.patientdata_details[i].UHIDNO;
        this.data_temp.pastencounter_no = this.patientdata_details[i].EncounterNo;
      }
    }
    // data.duration
    this.data_temp.nr = this.login_details[0]['nr'];

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/add_history_chief_complaint', this.data_temp).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
        debugger;
        this.get_chief_complaints_patient_details(this.patientdata_details);
        this.history = [];
        // this.response = resdata['ResponseObject'];
        // console.log(this.response);
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    })
  }

  // get_history_chief_complaint
  get_chief_complaints_patient_details(data_patient_deta) {
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_history_chief_complaint', data_patient_deta).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.history_patient_chief_complaints = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
        this.history_patient_chief_complaints = [];
      }
    })
  }
  remove_chiefcomplaints(rem_chiefcomplnts) {
    this.GlobalService.enableloader();
    rem_chiefcomplnts.nr = this.login_details[0]['nr'];
    console.log(rem_chiefcomplnts);
    debugger;
    // delete_history_chief_complaint
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/delete_history_chief_complaint', rem_chiefcomplnts).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.get_chief_complaints_patient_details(this.patientdata_details);
        this.GlobalService.disableloader();
        this.openSnackBar("Deleted Succesfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    })
  }
}
