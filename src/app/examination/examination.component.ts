import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  formdata; patientdata_details;date_status;
  page; sub; id; arrayss; formdatacr_drop; formdatacr; array; optionval;
  acess_rights; form_id; examination_qa; datevalidation; btn_sav;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.btn_sav = "Save";
    // console.log(this.GlobalService.user_access_rights);
    // this.acess_rights = this.GlobalService.user_access_rights;
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    // this.acess_rights = [{ "sub_menu_id": "1", "menu_id": "1", "sub_menu_name": "Past Encounters", "CD": "2017-11-08 19:08:17", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "1", "sub_menu_id": "1", "menu_id": "1", "sub_view_name": "Past Encounter Timeline", "Active": "1", "CD": "2017-11-08 19:29:23", "MD": null, "MB": null, "view": true, "add_edit": true }], "add_edit": true, "view": true }, { "sub_menu_id": "2", "menu_id": "1", "sub_menu_name": "Vitals", "CD": "2017-11-08 19:08:17", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "3", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "vitals", "Active": "1", "CD": "2017-11-08 19:30:50", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "4", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "Preferred Language", "Active": "1", "CD": "2017-11-08 19:30:50", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "5", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "Pain Assessment", "Active": "1", "CD": "2017-11-08 19:31:07", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "6", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "NOTES", "Active": "1", "CD": "2017-11-08 19:31:20", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "7", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "Allergy", "Active": "1", "CD": "2017-11-08 19:31:32", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "8", "sub_menu_id": "2", "menu_id": "1", "sub_view_name": "Active Medication", "Active": "1", "CD": "2017-11-08 19:31:44", "MD": null, "MB": null, "add_edit": true, "view": true }], "add_edit": true, "view": true }, { "sub_menu_id": "3", "menu_id": "1", "sub_menu_name": "History", "CD": "2017-11-08 19:08:38", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "9", "sub_menu_id": "3", "menu_id": "1", "sub_view_name": "Chief Complaints", "Active": "1", "CD": "2017-11-08 19:37:13", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "10", "sub_menu_id": "3", "menu_id": "1", "sub_view_name": "History Forms", "Active": "1", "CD": "2017-11-08 19:37:28", "MD": null, "MB": null, "add_edit": true, "view": true }], "add_edit": true, "view": true }, { "sub_menu_id": "4", "menu_id": "1", "sub_menu_name": "Examination", "CD": "2017-11-08 19:08:38", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "17", "sub_menu_id": "4", "menu_id": "1", "sub_view_name": "Examination Forms", "Active": "1", "CD": "2017-11-08 19:39:54", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }, { "sub_menu_id": "5", "menu_id": "1", "sub_menu_name": "Diagnosis", "CD": "2017-11-08 19:08:57", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "22", "sub_menu_id": "5", "menu_id": "1", "sub_view_name": "Consultation Notes", "Active": "1", "CD": "2017-11-08 19:41:51", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "23", "sub_menu_id": "5", "menu_id": "1", "sub_view_name": "Icd Codes", "Active": "1", "CD": "2017-11-08 19:42:14", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "24", "sub_menu_id": "5", "menu_id": "1", "sub_view_name": "Procedure", "Active": "1", "CD": "2017-11-08 19:42:31", "MD": null, "MB": null, "add_edit": true, "view": true }], "view": true, "add_edit": true }, { "sub_menu_id": "6", "menu_id": "1", "sub_menu_name": "Investigation", "CD": "2017-11-08 19:08:57", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "25", "sub_menu_id": "6", "menu_id": "1", "sub_view_name": "Investigations", "Active": "1", "CD": "2017-11-08 19:46:08", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }, { "sub_menu_id": "7", "menu_id": "1", "sub_menu_name": "Prescription", "CD": "2017-11-08 19:09:14", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "28", "sub_menu_id": "7", "menu_id": "1", "sub_view_name": "Medication", "Active": "1", "CD": "2017-11-08 19:47:04", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "29", "sub_menu_id": "7", "menu_id": "1", "sub_view_name": "Notes", "Active": "1", "CD": "2017-11-08 19:47:18", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "30", "sub_menu_id": "7", "menu_id": "1", "sub_view_name": "Diet Advice", "Active": "1", "CD": "2017-11-08 19:47:40", "MD": null, "MB": null, "add_edit": true, "view": true }], "view": true, "add_edit": true }, { "sub_menu_id": "8", "menu_id": "1", "sub_menu_name": "Reports", "CD": "2017-11-08 19:09:14", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "31", "sub_menu_id": "8", "menu_id": "1", "sub_view_name": "Reports Table View", "Active": "1", "CD": "2017-11-08 19:49:12", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "32", "sub_menu_id": "8", "menu_id": "1", "sub_view_name": "Reports Graphical View", "Active": "1", "CD": "2017-11-08 19:49:12", "MD": null, "MB": null, "add_edit": true, "view": true }], "view": true, "add_edit": true }, { "sub_menu_id": "9", "menu_id": "1", "sub_menu_name": "Follow-up", "CD": "2017-11-08 19:09:31", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "33", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "OP Follow-up", "Active": "1", "CD": "2017-11-08 19:49:46", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "34", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "Recommend IP Admission", "Active": "1", "CD": "2017-11-08 19:50:03", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "35", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "Surgery / Procedure", "Active": "1", "CD": "2017-11-08 19:50:20", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "36", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "Cross Consultation", "Active": "1", "CD": "2017-11-08 19:50:35", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "37", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "NOTES", "Active": "1", "CD": "2017-11-08 19:51:00", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "38", "sub_menu_id": "9", "menu_id": "1", "sub_view_name": "Refer to an External Doctor", "Active": "1", "CD": "2017-11-08 19:51:20", "MD": null, "MB": null, "add_edit": true, "view": true }], "view": true, "add_edit": true }, { "sub_menu_id": "10", "menu_id": "1", "sub_menu_name": "OP Summary", "CD": "2017-11-08 19:09:31", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "39", "sub_menu_id": "10", "menu_id": "1", "sub_view_name": "OP Summary View", "Active": "1", "CD": "2017-11-08 19:58:41", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }, { "sub_menu_id": "11", "menu_id": "2", "sub_menu_name": "Services Rendered", "CD": "2017-11-09 10:47:36", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "40", "sub_menu_id": "11", "menu_id": "2", "sub_view_name": "Services Rendered View", "Active": "1", "CD": "2017-11-09 10:48:15", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }, { "sub_menu_id": "14", "menu_id": "3", "sub_menu_name": "Manage Favourites", "CD": "2017-11-09 10:54:38", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "44", "sub_menu_id": "14", "menu_id": "3", "sub_view_name": "Drugs", "Active": "1", "CD": "2017-11-09 10:55:47", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "45", "sub_menu_id": "14", "menu_id": "3", "sub_view_name": "Prescription", "Active": "1", "CD": "2017-11-09 10:55:47", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "46", "sub_menu_id": "14", "menu_id": "3", "sub_view_name": "Investigation", "Active": "1", "CD": "2017-11-09 10:56:19", "MD": null, "MB": null, "add_edit": true, "view": true }, { "sub_view_id": "47", "sub_menu_id": "14", "menu_id": "3", "sub_view_name": "OP Summary View", "Active": "1", "CD": "2017-11-09 10:56:56", "MD": null, "MB": null, "add_edit": true, "view": true }], "view": true, "add_edit": true }, { "sub_menu_id": "12", "menu_id": "4", "sub_menu_name": "Manage Roles", "CD": "2017-11-09 10:49:43", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "41", "sub_menu_id": "12", "menu_id": "4", "sub_view_name": "Manage Roles View", "Active": "1", "CD": "2017-11-09 10:50:13", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }, { "sub_menu_id": "13", "menu_id": "5", "sub_menu_name": "Manage Forms", "CD": "2017-11-09 10:51:03", "MD": null, "MB": null, "sub_view": [{ "sub_view_id": "42", "sub_menu_id": "13", "menu_id": "5", "sub_view_name": "Available Forms", "Active": "1", "CD": "2017-11-09 10:51:30", "MD": null, "MB": null, "view": true, "add_edit": true }, { "sub_view_id": "43", "sub_menu_id": "13", "menu_id": "5", "sub_view_name": "Add New Form", "Active": "1", "CD": "2017-11-09 10:52:54", "MD": null, "MB": null, "view": true, "add_edit": true }], "view": true, "add_edit": true }];
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.viewfor();
    this.optionval = {};
    this.form_id = ["2"];
    this.get_examination_qa(this.patientdata_details);
    // this.view(this.form_id);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  viewfor() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_formsorg_examination').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        this.GlobalService.disableloader();
        debugger;
        this.formdatacr_drop = resdata;
        console.log(this.formdatacr_drop);
      }
      else {
        this.GlobalService.disableloader();
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }
  get_examination_qa(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_examination', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.examination_qa = JSON.parse(resdata['ResponseObject'][0].tvs_nxt_form_exam)
        this.examination_qa.forEach(data => {
          this.form_id.push(data.form_id)
        });
        console.log(this.examination_qa);
        if (this.examination_qa.length == 0) {
          this.btn_sav = "save";
        } else {
          this.btn_sav = "Update";
        }
      }
      this.view(this.form_id);
    })
    
  }
  view(data) {
    debugger;
    if (data.length != 0) {
      this.GlobalService.enableloader();
      this.array = { 'data': data };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/getformdetailview_exam', this.array).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata) {
          this.GlobalService.disableloader();
          debugger;
          this.formdatacr = resdata;
          console.log(this.formdatacr);

          if (this.examination_qa) {
            for (var p = 0; p < this.formdatacr.length; p++) {
              for (var k = 0; k < this.formdatacr[p].question.length; k++) {
                for (var t = 0; t < this.examination_qa.length; t++) {
                  if (this.formdatacr[p].question[k].question_id == this.examination_qa[t].question_id) {
                    if (this.formdatacr[p].question[k].options_type == "1" || this.formdatacr[p].question[k].options_type == "2" || this.formdatacr[p].question[k].options_type == "5") {
                      this.formdatacr[p].question[k].answer = this.examination_qa[t].answer;
                      this.formdatacr[p].question[k].add_examination_patient_id = this.examination_qa[t].add_examination_patient_id;

                    }
                    else if (this.formdatacr[p].question[k].options_type == "3" || this.formdatacr[p].question[k].options_type == "4") {
                      for (var j = 0; j < this.formdatacr[p].question[k].question_option.length; j++) {
                        this.formdatacr[p].question[k].question_option[j].answer = this.examination_qa[t].answer;
                        this.formdatacr[p].question[k].question_option[j].answer = this.examination_qa[t].add_examination_patient_id;
                      }
                    } else {
                      for (var j = 0; j < this.formdatacr[p].question[k].question_option.length; j++) {
                        this.formdatacr[p].question[k].question_option[j].answer = this.examination_qa[t].answer;
                        this.formdatacr[p].question[k].question_option[j].answer = this.examination_qa[t].add_examination_patient_id;
                      }
                    }
                  }
                }
              }
            }
          }

          console.log(this.formdatacr);

        }
        else {
          this.GlobalService.disableloader();
        }
        // routerLink='/Homescreen/Patientlist'
      })
    } else {
      this.formdatacr = [];
      this.openSnackBar("Please Select One Template", "Close");
      this.GlobalService.disableloader();
    }

  }
  save(data) {
    debugger;
    // if (this.btn_sav == "Save") {
      console.log(data);
      var testarray = [];
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data.forEach(formObj => {
          formObj['question'].forEach(questionObj => {
            if (questionObj['options_type'] == '1' || questionObj['options_type'] == '2' || questionObj['options_type'] == '5') {
              console.log("question", questionObj['name']);
              console.log("answer", questionObj['answer']);
              testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': questionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'] });
            } else {
              console.log("question", questionObj['name']);
              questionObj['question_option'].forEach(optionObj => {
                if (optionObj['answer']) {
                  console.log("Answer", optionObj['options']);
                  testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': optionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'] });
                }
              });
            }
          });
        });
      }
      // this.array = { 'data': data };
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_patient_examination', testarray).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          debugger;
          this.btn_sav = "Update";
          this.GlobalService.disableloader();
          this.openSnackBar("Saved Successfully", "Close");
        } else {
          this.btn_sav = "Update";
          this.GlobalService.disableloader();
          this.openSnackBar("!Error,Please Retry", "Close");
        }
        // routerLink='/Homescreen/Patientlist'
      })
    // } else {
    //   // this.btn_sav = "Update";
    //   console.log(data);
    //   var testarray = [];
    //   for (var i = 0; i < this.patientdata_details.length; i++) {
    //     data.forEach(formObj => {
    //       formObj['question'].forEach(questionObj => {
    //         if (questionObj['options_type'] == '1' || questionObj['options_type'] == '2' || questionObj['options_type'] == '5' || questionObj['options_type'] == '3') {
    //           console.log("question", questionObj['name']);
    //           console.log("answer", questionObj['answer']);
    //           testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': questionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'], 'add_examination_patient_id': questionObj['add_examination_patient_id'] });
    //         } else {
    //           console.log("question", questionObj['name']);
    //           questionObj['question_option'].forEach(optionObj => {
    //             if (optionObj['answer']) {
    //               console.log("Answer", optionObj['options']);
    //               testarray.push({ 'encounter_no': this.patientdata_details[i].EncounterNo, 'question': questionObj['name'], 'answer': optionObj['answer'], 'form_id': questionObj['form_id'], 'question_id': questionObj['question_id'], 'add_examination_patient_id': questionObj['add_examination_patient_id'] });
    //             }
    //           });
    //         }
    //       });
    //     });
    //   }
    //   // this.array = { 'data': data };
    //   this.GlobalService.enableloader();
    //   this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_patient_examination', testarray).subscribe(resdata => {
    //     debugger;
    //     console.log(resdata);
    //     if (resdata['IsSuccess']) {
    //       debugger;
    //       this.btn_sav = "Update";
    //       this.GlobalService.disableloader();
    //       this.openSnackBar("Updated Successfully", "Close");
    //     } else {
    //       this.btn_sav = "Update";
    //       this.GlobalService.disableloader();
    //       this.openSnackBar("!Error,Please Retry", "Close");
    //     }
    //     // routerLink='/Homescreen/Patientlist'
    //   })
    //   // update_patient_examination
    // }

  }

}
