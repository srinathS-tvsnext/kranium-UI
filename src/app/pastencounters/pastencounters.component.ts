import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-pastencounters',
  templateUrl: './pastencounters.component.html',
  styleUrls: ['./pastencounters.component.css']
})
export class PastencountersComponent implements OnInit {
  favs; socialmentions; patientdata_details; uhid_no; pastencounter_no; hidden; date_custom; logindata_details; login;
  pdfstatus;

  check_ped_vitaldata;check_ped_consultaiondata;check_ped_diagnosisdata;check_ped_investigationdata;check_ped_examinationdata;
  check_ped_history;check_ped_history_chiefcomplaints;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.hidden = true;
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.logindata_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.patientdata_details);
    this.ss();
    // this.is_check_pdf();

    // this.favs = [{
    //   "Patient_ID": "1020007696",
    //   "Pastencounter_ID": "201710120000",
    //   "Doctor_ID": "100486",
    //   "Doctor_Name": "Dr.Amala Florida(General Physician) . ",
    //   "cheif_complaints": "The patient is having fever.",
    //   "Diagnosis": "A01.- Typhoid and paratyphoid fevers",
    //   "opipstatus": "1",
    //   "Discharge_date": "2017-10-12",
    //   "Admission_Date": "2017-10-12 11:09:01"
    // }, {
    //   "Patient_ID": "1020007696",
    //   "Pastencounter_ID": "201710120000",
    //   "Doctor_ID": "100486",
    //   "Doctor_Name": "Dr.Anandh Florida(General Physician) . ",
    //   "cheif_complaints": "The patient is having aids.",
    //   "Diagnosis": "A01.- Typhoid and paratyphoid fevers",
    //   "opipstatus": "2",
    //   "Discharge_date": "2017-10-12",
    //   "Admission_Date": "2017-10-12 11:09:01"
    // }]
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  ss() {
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        this.uhid_no = this.patientdata_details[i].UHIDNO;
        this.pastencounter_no = this.patientdata_details[i].EncounterNo;
      }
      // savedata.CB= this.patientdata_details.;
    }
    var newarray = { "uhid_no": this.uhid_no, "pastencounter_no": this.pastencounter_no };
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_pastencounterlist', newarray).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.hidden = true;
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.favs = resdata['ResponseObject'];
        for (var i = 0; i < this.favs.length; i++) {
          if (this.favs[i]) {
            // 2018-01-17 12:20:32
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            var date = new Date(this.favs[i].encounter_date);

            var day = date.getDate();
            var month = monthNames[date.getMonth()];
            var year = date.getFullYear();
            this.favs[i].date_custom = day + '-' + month + '-' + year;

          }
        }
      } else {
        debugger;
        this.GlobalService.disableloader();
        this.openSnackBar("Error: No Related Data Found In Pastencounter", "Close");
        // this.router.navigate(['/Homescreen/Patientdetails/Vitals']);
        this.hidden = false;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var date = new Date();

        var day = date.getDate();
        var month = monthNames[date.getMonth()];
        var year = date.getFullYear();
        this.date_custom = day + '-' + month + '-' + year;
        this.login = this.logindata_details[0].User_name;
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }


  pastencounter_detail(data_detailsd) {
    console.log(data_detailsd);
    debugger;
    sessionStorage.removeItem('Pastencountedata');
    var data_eeee = [];
    data_detailsd.EncounterNo = data_detailsd.Pastencounter_ID;
    data_detailsd.UHIDNO = data_detailsd.PATIENT_ID;
    data_eeee.push(data_detailsd);
    // JSOME
    sessionStorage.setItem("Pastencountedata", JSON.stringify(data_eeee));

    var encid = { "encounter_no": data_detailsd.Pastencounter_ID };
    //check vitals
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_vitaldetail', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.GlobalService.disableloader();
        this.check_ped_vitaldata = resdata['ResponseObject'];
      }
    })

    //check consultaion notes
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_consultation', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.GlobalService.disableloader();
        this.check_ped_consultaiondata = resdata['ResponseObject'];
      }
    })

    //check diagnosis
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_diagnosis', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.GlobalService.disableloader();
        this.check_ped_diagnosisdata = resdata['ResponseObject'];
      }
    })
    //check diagnosis
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_investigation', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.check_ped_investigationdata = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }
    })

    //check examination
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_examination', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.check_ped_examinationdata = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }
    }) 
    //check history
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_history', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.check_ped_history = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }
    })
    //check history chief complaints
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_ped_history_chiefcomplaints', encid).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
      } else {
        this.check_ped_history_chiefcomplaints = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      }
    })

    if((this.check_ped_vitaldata || this.check_ped_consultaiondata || this.check_ped_diagnosisdata || this.check_ped_investigationdata || this.check_ped_examinationdata || this.check_ped_history || this.check_ped_history_chiefcomplaints) == "noexist"){
      this.openSnackBar("Past Encounter Details is Empty", "Close");
    }
    //this.router.navigate(['/Homescreen/Patientdetails/Pastencounterdetails']);
  }

  pdf_view(data_pdf) {
    debugger;
    // http://localhost/global/api/index.php/v1/post/Pastencounter/get_pastencounter_pdf
    var data_edit = { "encounter_no": data_pdf };
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_pastencounter_pdf', data_edit).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.hidden = true;
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
      }
    })
  }

  is_check_pdf(){
    var uhid = { "uhid": this.patientdata_details[0].UHIDNO };
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/pdf_list_check', uhid).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.pdfstatus = resdata['ResponseObject'];
      }else{
        this.GlobalService.disableloader();
        console.log(resdata['ResponseObject']);
        this.pdfstatus = resdata['ResponseObject'];
      }
    })
  }

}
