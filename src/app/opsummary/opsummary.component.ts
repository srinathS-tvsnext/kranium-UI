import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-opsummary',
  templateUrl: './opsummary.component.html',
  styleUrls: ['./opsummary.component.css']
})
export class OpsummaryComponent implements OnInit {
  date; date_status;
  opsummary_template_list;
  vitals_data;
  patientdata_details;
  consultation_notes;
  diagno_presc_patioent;
  pres_data;
  Investigation_template_category;
  examination_qa;
  history_qa;
  history_patient_chief_complaints; template; opp_template; diagno_icd_patioent;
  hideen; consolidated_data; hidden_edit; hidden_update; hidden_cancel; hidden_print;diagno_icd_patioent_provitional
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService) { }

  ngOnInit() {
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.hidden_edit = false;
    this.hidden_update = true;
    this.hidden_cancel = true;
    this.hidden_print = false;
    this.consolidated_data = [];
    this.hideen = true;
    this.date = new Date();
    this.get_opsummary_template();
    this.template = [];
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.get_vital_patient(this.patientdata_details);
    this.vitals_data = {};

    this.get_history_consultation_notes(this.patientdata_details);
    this.get_procedure_diag_patient(this.patientdata_details);
    this.get_pres(this.patientdata_details);
    this.get_last_investigation(this.patientdata_details);
    this.get_examination_qa(this.patientdata_details);
    this.get_history_qa(this.patientdata_details);
    this.get_chief_complaints_patient_details(this.patientdata_details);
    this.get_icd_codes_patient(this.patientdata_details);
  
  }
  template_change(data_termp) {
    debugger;
    if (data_termp.template_name == "ALL") {
      this.template = [];
      this.template.push(data_termp.opsummary_template);
      console.log(this.template);
    } else {
      this.template = [];
      this.template.push(JSON.parse(data_termp.opsummary_template));
      console.log(this.template);
    }

  }
  get_icd_codes_patient(data_icd) {
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data_icd.uhid_no = this.patientdata_details[i].UHIDNO;
        data_icd.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_history_icd_codes', data_icd).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.diagno_icd_patioent = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_history_icd_provitionalCode', data_icd).subscribe(resdatas => {
      if (resdatas['IsSuccess']) {
          this.GlobalService.disableloader();       
          this.diagno_icd_patioent_provitional = resdatas['ResponseObject'];
        } else {
          this.GlobalService.disableloader();          
        }
      });
    })
  }
  get_opsummary_template() {
    // get_opsummary_template
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/get_opsummary_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        var data = {
          Active: "1",
          CB: null,
          CD: "2018-01-09 15:44:18",
          MB: null,
          MD: null,
          manage_favourites_opsummary_id: "9",
          opsummary_template: { "firstname": true, "Occupation": true, "Age": true, "Civil": true, "District": true, "Billing": true, "Phone": true, "Status": true, "Refferance": true, "Religion": true, "Mobile": true, "Insurance": true, "State": true, "Email": true, "Nationality": true, "Corporate": true, "Country": true, "Town": true, "Blood": true, "fathertname": true, "Privilege": true, "lastname": true, "Qualification": true, "DOB": true, "Address": true, "Height": true, "Weight": true, "Temperature": true, "BP": true, "Respiratory": true, "BSA": true, "BMI": true, "Pulse": true, "Pain_Assessment": true, "Preferred_Language": true, "Notes": true, "Allergy": true, "Active_Medication": true, "History_Questions_Answers": true, "Examination_Questions_Answers": true, "ICD_description": true, "Consultation_Notes": true, "Procedure": true, "Current_Investigation": true, "Current_Prescription": true, "Diet_Advice": true, "Table_View": true, "Graphical_View": true, "OP_Follow_up": true, "Recommend_IP_Admission": true, "Surgery_Procedure": true, "Cross_Consultation": true, "NOTES_followup": true },
          template_name: "ALL"
        };
        this.opsummary_template_list = resdata['ResponseObject'];
        this.opsummary_template_list.unshift(data);
        this.template_change(data);
        this.opp_template = data;
        this.template_change(this.opp_template);
        console.log(this.opsummary_template_list);
      }
    })
  }

  get_vital_patient(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    let count = 0;
    let chklength = 0;
    if (patientdata_details) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail', patientdata_details).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          let resData = [{}];
          this.vitals_data.Formvalue = resdata['ResponseObject'];
          for(let j=0;j<this.vitals_data.Formvalue.length;j++){
            chklength++;
            if(chklength == 13){
              resData.push({});
              chklength = 0;
              count++;
            }   
            resData[count][this.vitals_data.Formvalue[j].name] = this.vitals_data.Formvalue[j].value;
          }
          this.vitals_data.Formvalue = resData;
        }
      })
          this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getallergydetail', patientdata_details).subscribe(resdata => {
            if (resdata['IsSuccess']) {
              this.vitals_data.allergy = resdata['ResponseObject'];
              for(let i=0;i<this.vitals_data.allergy.length;i++){
                if(this.vitals_data.allergy[i].notes != ''){
                  this.vitals_data.allergy[i].notes = JSON.parse(this.vitals_data.allergy[i].notes);
                }
              }
            }
          })
            this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/getactmedicationdetail', patientdata_details).subscribe(resdata => {
              if (resdata['IsSuccess']) {
                this.vitals_data.medication = resdata['ResponseObject'][0].tvs_nxt_form_trimed;
                this.vitals_data.medication = JSON.parse(this.vitals_data.medication)
              }
            })
    }
  }

  //get_consultation_notes
  get_history_consultation_notes(data) {

    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_history_consultation_notes', data).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.consultation_notes = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_procedure_diag_patient(data_icd) {
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_diagnosis_prescription', data_icd).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.diagno_presc_patioent = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_pres(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Manageroles/patient_prescription_encounterno', patientdata_details).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.pres_data = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_last_investigation(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_last_investigation', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.Investigation_template_category = resdata['ResponseObject'];
        console.log(this.Investigation_template_category);
      }
    })
  }

  get_examination_qa(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_examination', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.examination_qa = JSON.parse(resdata['ResponseObject'][0].tvs_nxt_form_exam);
        console.log(this.examination_qa);
      }
    })
  }

  get_history_qa(patientdata_details) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_history_qa', patientdata_details).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        this.history_qa = resdata['ResponseObject'];
        console.log(this.history_qa);
      }
    })
  }

  get_chief_complaints_patient_details(data_patient_deta) {
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_history_chief_complaint', data_patient_deta).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.history_patient_chief_complaints = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }


  //Edit_opsummary()
  edit_opsummary(data_edit) {
    debugger;
    this.hideen = false;
    this.hidden_edit = true;
    this.hidden_update = false;
    this.hidden_cancel = false;
    this.hidden_print = true;
  }

  //Cancel_opsummary
  cancel_opsummary() {
    debugger;
    this.hideen = true;
    this.hidden_edit = false;
    this.hidden_update = true;
    this.hidden_cancel = true;
    this.hidden_print = false;
  }

  update_opsummary(data_edit) {
    this.hideen = true;
    this.hidden_edit = false;
    this.hidden_update = true;
    this.hidden_cancel = true;
    this.hidden_print = false;
  }

  add_opsummary_patient(data_add) {
    this.consolidated_data.push(data_add);
    console.log(this.consolidated_data);
    debugger;

  }

  printPreview() {
    var toPrint = document.getElementById('printSectionId');
    var popupWin = window.open('', '_blank', 'width=800,height=600,location=no,left=200px');
    popupWin.document.open();
    popupWin.document.write('<html><head><style>@page {margin-top: 5cm;margin-bottom: 1cm;margin-left: 2.5cm;margin-right: 1.5cm;}.btn-infos{display:none;}.btn-white{border-radius: 12px;background-color: white;color: steelblue;padding: 20px;text-align: center;display: inline-block;font-size: 12px;margin: 4px 2px;border:1px solid steelblue;}.tb2{width:100%;}.tb2 th:first-child,.tb2 td:first-child{display:none;}.tb2{border-collapse: collapse;}.tb2 th,.tb2 td{border: 1px solid #ddd;}.tb2 thead{font-weight:600;}.table{width: 50%;}.table{border-collapse: collapse;}.table th,.table td{border: 1px solid #ddd;}.table thead{font-weight:600;}.textsiz{margin-left:5px;font-weight: 600;font-size: 8px;}.painrate{margin-left:20px;font-weight: 600;font-size: 9px;padding-left: 20px;}.imgsize{width: 75px;height: 75px;margin-left:10px;margin-bottom:15px;}.btn-steelblue{display:none}.tb{width: 50%;}.tb th:first-child,.tb td:first-child{display:none;}.tb{border-collapse: collapse;}.tb th,.tb td{border: 1px solid #ddd;}.tb thead{font-weight:600;}.col-md-6{width:50%;float:left}.col-md-5{width:40%;float:left}.col-md-12{width:100%;float:left}.panel-body{float:left;margin:20px;width:100%;}.bolder{font-weight:600;color:steelblue;}.panel{border:1px solid lightgrey;}</style><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></head><body onload="window.print()">')
    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write('</body></html>');
    popupWin.document.close();
  }






}





