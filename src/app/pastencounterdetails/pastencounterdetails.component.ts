import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-pastencounterdetails',
  templateUrl: './pastencounterdetails.component.html',
  styleUrls: ['./pastencounterdetails.component.css']
})
export class PastencounterdetailsComponent implements OnInit {
  date;
  opsummary_template_list;
  vitals_data;
  patientdata_details;
  consultation_notes;
  diagno_presc_patioent;
  pres_data;
  description_list;
  examination_qa;
  history_qa;
  history_patient_chief_complaints; template; pastencounter_enc;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService) { }

  ngOnInit() {
    this.date = new Date();
    this.get_opsummary_template();
    this.pastencounter_enc = JSON.parse(sessionStorage.getItem('Pastencountedata'));
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.get_vital_patient(this.pastencounter_enc);
    this.vitals_data = {};
    this.get_history_consultation_notes(this.pastencounter_enc);
    this.get_procedure_diag_patient(this.pastencounter_enc);
    this.get_pres(this.pastencounter_enc);
    this.get_last_investigation(this.pastencounter_enc);
    this.get_examination_qa(this.pastencounter_enc);
    this.get_history_qa(this.pastencounter_enc);
    this.get_chief_complaints_patient_details(this.pastencounter_enc);
    // manage_favourites_opsummary_id
  }
  template_change(data_termp) {
    debugger;
  }
  get_opsummary_template() {
    // get_opsummary_template
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/get_opsummary_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.opsummary_template_list = resdata['ResponseObject'];
        console.log(this.opsummary_template_list);
      }
    })
  }

  get_vital_patient(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    if (patientdata_details) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_vitaldetail', patientdata_details).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.vitals_data = resdata['ResponseObject'];
        } else {
          this.GlobalService.disableloader();
        }
      })
    }
  }

  //get_consultation_notes
  get_history_consultation_notes(data) {

    this.GlobalService.enableloader();
    debugger;
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

  get_last_investigation(data_ss) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_last_investigation', data_ss).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.description_list = resdata['ResponseObject'];
        console.log(this.description_list);
      }
    })
  }

  get_examination_qa(data_ssss) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_examination', data_ssss).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
        this.examination_qa = resdata['ResponseObject'];
        console.log(this.examination_qa);
      }
    })
  }

  get_history_qa(datata_pp) {
    // get_opsummary_template
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_history_qa', datata_pp).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        console.log();
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

}
