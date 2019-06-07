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
   
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
   
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.viewfor();
    this.optionval = {};
    this.form_id = ["2"];
    this.get_examination_qa(this.patientdata_details);

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
    })
  }
  get_examination_qa(patientdata_details) {
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_examination', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.examination_qa = JSON.parse(resdata['ResponseObject'][0].tvs_nxt_form_exam)
        if(this.examination_qa != null){
          this.examination_qa.forEach(data => {
            this.form_id.push(data.form_id)
          });
        } else{
          this.examination_qa = [];
        }
        
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
      
      })
    } else {
      this.formdatacr = [];
      this.openSnackBar("Please Select One Template", "Close");
      this.GlobalService.disableloader();
    }

  }
  save(data) {
    debugger;
   
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

      })
    
  }

}
