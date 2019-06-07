import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css'],
})
export class DiagnosisComponent implements OnInit {
  isChecked = true;
  data_nn; date_status;
  IsHidden; icd_code_data; search; diagno_consultationnotes; patientdata_details; save_newdata; procedure_category;
  diagnosis_procedure; payment_status; data_status; consultation_notes; diagno_icd_patioent; diagno_presc_patioent;
  showGreeting; exampleDatas; items; spinner; login_details; acess_rights; notes_data; diagno_icd_patioent_provitional

  Investigation_category; newarraysss; hidden; categorylist_array; hiddengif; hiddengif1;
  hide; Investigation_menu; datevalidation;
  save_icdcode;
  showIcd = true;btnName;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, private GlobalService: GlobalService) {
  
  }
  public editor;
  public editorContent = ``;
  public editorOptions = {
    placeholder: "Hello Globals..."
  };

  onEditorBlured(quill) {
   
  }

  onEditorFocused(quill) {
   
  }

  onEditorCreated(quill) {
    this.editor = quill;
   
  }

  onContentChanged({ quill, html, text }) {
    
  }

  ngOnInit() {
    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.diagno_consultationnotes = { state: '' };
    this.diagno_consultationnotes.data_res = "Final";
    this.get_icc_test();
    this.data_nn = {};
    this.icd_code_data = [];
    this.hide = false;
    this.btnName = 'Save';
    
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.spinner = true;
    this.exampleDatas = [];
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.IsHidden = true;

    this.save_newdata = {};
    // this.getprocedure_diagnosis();
    this.diagnosis_procedure = {};
    this.get_history_consultation_notes(this.patientdata_details);
    this.get_icd_codes_patient(this.patientdata_details);
    this.get_procedure_diag_patient(this.patientdata_details);

    //search procedure
    this.categorylist_array = [];
    this.hidden = true;
    this.hiddengif = true;
    this.hiddengif1 = true;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  onOpen(pay_statussda) {
    this.notes_data = pay_statussda;
    this.IsHidden = false;
  }
  onClose() {
    this.IsHidden = true;
  }
  foods = [
    { value: 'steak-0', viewValue: 'Diagnosis Type 1' },
    { value: 'pizza-1', viewValue: 'Diagnosis Type 2' },
    { value: 'tacos-2', viewValue: 'Diagnosis Type 3' },
    { value: 'umm-2', viewValue: 'Diagnosis Type 4' }
  ];

  cats = [
    { value: 'steak-0', viewValue: 'Category 1' },
    { value: 'pizza-1', viewValue: 'Category 2' },
    { value: 'tacos-2', viewValue: 'Category 3' },
    { value: 'umm-2', viewValue: 'Category 4' }
  ];

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
        this.diagno_consultationnotes.consultation_notes = resdata['ResponseObject'][0].notes;
      } else {
        this.consultation_notes = [];
        this.GlobalService.disableloader();
      }
      if(this.consultation_notes.length == 0){
        this.btnName = 'Save';
      } else{
        this.btnName = 'Update';
      }
    })
  }


  //geticdcodes
  get_icdcodes(data) {
    debugger;
    this.hiddengif1 = true;

    this.icd_code_data = [];
    this.exampleDatas = [];
    this.search = { "search": data };

    if(data.length > 3){      
      this.hiddengif1 = false;
    this.http.post(this.GlobalService.baseurl+ '/api/index.php/v1/get/Masters/geticdcodes', this.search)
     .subscribe(resdata => {

       console.log(resdata);
       if (resdata['IsSuccess']) {
         this.hiddengif1 = true;
         debugger;
         this.icd_code_data = resdata['ResponseObject'];
         this.showGreeting = true;

       } else {
         this.icd_code_data = [];
         this.hiddengif1 = true;
       }
     })
     }
     
  }
  changeIcdStatus(){
    this.diagno_consultationnotes.state = '';
    if(this.diagno_consultationnotes.data_res === 'Final'){
      this.showIcd = true;
    } else{
      this.showIcd = false;
    }
  }
  get_icc_test() {
    
  }




  save_consultation_notes(data_notes) {
    debugger;
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data_notes.uhid_no = this.patientdata_details[i].UHIDNO;
        data_notes.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }

    data_notes.nr = this.login_details[0]['nr'];
    var newarray = { "chief_complaints": data_notes.consultation_notes, "uhid_no": data_notes.uhid_no, "encounter_no": data_notes.encounter_no, "nr": data_notes.nr };
    if(this.btnName == 'Save') {
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/add_history_consultation_notes', newarray).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.openSnackBar("Save Successully", "Close");
        this.diagno_consultationnotes.consultation_notes = {};
        this.get_history_consultation_notes(this.patientdata_details);
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error? not added", "Close");
      }
    })
    } else {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/update_history_consultation_notes', newarray).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          this.openSnackBar("Save Successully", "Close");
          this.diagno_consultationnotes.consultation_notes = {};
          this.get_history_consultation_notes(this.patientdata_details);
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error? not added", "Close");
        }
      })
    }
  }

  delete_notes(notes) {
    this.GlobalService.enableloader();
    notes.nr = this.login_details[0]['nr'];
    console.log(notes);
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/delete_history_consultation_notes', notes).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.get_history_consultation_notes(this.patientdata_details);
        this.GlobalService.disableloader();
        this.openSnackBar("Deleted Succesfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    })
  }
  
  unique_check_icd_code(data_notes_icdnew){
    debugger;
    if(this.check_icd_code(data_notes_icdnew)){
        this.save_icd_code(data_notes_icdnew);
    }
  }

  check_icd_code(data_notes_icdnew){
    for (var j = 0; j < this.diagno_icd_patioent.length; j++) {
      if (this.diagno_icd_patioent[j].Diagnosiscode == data_notes_icdnew.state) {
        this.openSnackBar("This  is Already Added , Please Add Onother One", "Close");
        return false;
      } 
    }
    return true;
  }

  save_icd_code(data_notes_icdnew) {
    debugger;
      if (data_notes_icdnew) {
        if (this.patientdata_details) {
          for (var i = 0; i < this.patientdata_details.length; i++) {
            data_notes_icdnew.uhid_no = this.patientdata_details[i].UHIDNO;
            data_notes_icdnew.encounter_no = this.patientdata_details[i].EncounterNo;
            data_notes_icdnew.desitination = data_notes_icdnew.data_res;
          }
        }
      }
      data_notes_icdnew.nr = this.login_details[0]['nr'];
      console.log(data_notes_icdnew);
      if(data_notes_icdnew.data_res == 'Final'){
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/add_history_icd_codes', data_notes_icdnew).subscribe(resdata => {
          debugger;
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.openSnackBar("Save Successully", "Close");
            this.get_icd_codes_patient(this.patientdata_details);
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Error? not added", "Close");
          }
        })
      } else{
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/add_history_icd_codes_provitional', data_notes_icdnew).subscribe(resdata => {
          debugger;
          if (resdata['IsSuccess']) {
            this.GlobalService.disableloader();
            this.openSnackBar("Save Successully", "Close");
            this.get_icd_codes_patient(this.patientdata_details);
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Error? not added", "Close");
          }
        })
      }
      
  }
  get_icd_codes_patient(data_icd, callback = null) {
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data_icd.uhid_no = this.patientdata_details[i].UHIDNO;
        data_icd.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_history_icd_codes', data_icd).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.diagno_icd_patioent = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
        this.diagno_icd_patioent = [];
      }
    });
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_history_icd_provitionalCode', data_icd).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.diagno_icd_patioent_provitional = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
        this.diagno_icd_patioent_provitional = [];
      }
    });
    
    

  }

  delete_icd_code(delete_icd_data,icdtype) {
    this.GlobalService.enableloader();
    delete_icd_data.encounterno = this.date_status.encounterno;
    console.log(delete_icd_data);
    debugger;
    if(icdtype === 'final') {
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/delete_history_icd_codes', delete_icd_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.get_icd_codes_patient(this.patientdata_details);
        this.GlobalService.disableloader();
        this.openSnackBar("Deleted Succesfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    }) 
  } else {
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/delete_history_provitional_codes', delete_icd_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.get_icd_codes_patient(this.patientdata_details);
        this.GlobalService.disableloader();
        this.openSnackBar("Deleted Succesfully", "Close");
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    }) 
  }
  }

  get_procedure_diag_patient(data_icd) {
    console.log(data_icd);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_diagnosis_prescription', data_icd).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.diagno_presc_patioent = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
        this.diagno_presc_patioent = [];
      }
    })
  }



  get_procedure_payment_status(pay_status) {
    debugger;
    this.spinner = false;
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        pay_status.uhid_no = this.patientdata_details[i].UHIDNO;
        pay_status.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }
    debugger;
    var newarray = { "chief_complaints": pay_status.item_code, "uhid_no": pay_status.uhid_no, "encounter_no": pay_status.encounter_no, "add_diagnosis_procedure_id": pay_status.add_diagnosis_procedure_id };

    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/get_procedure_diagnosis_payment_status', newarray).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.spinner = true;
        this.hide = true;
        this.GlobalService.disableloader();
        debugger;
        this.get_procedure_diag_patient(this.patientdata_details);

      } else {
        this.hide = false;
        this.spinner = true;
        this.GlobalService.disableloader();

      }
    
    })
  }

  //Dropdown

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {

    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    if (value.length > 2) {
      this.get_icdcodes(value)
    }

    console.log('New search input: ', value);
  }
  public trigger = function ($event) {
    if ($event.value && $event.value.selectedRows) {
      this.selectedRows = $event.value.selectedRows.length;
    }
  };
  public refreshValue(value: any): void {
    // this.value = value;
  }


  selectedalbumchange(dataa) {

  }

  //procedure search
  get_medicine_kranium_list_gen(data_con) {
    debugger;
    this.hiddengif = false;
    if (data_con.length > 2) {
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
          this.active_checkbox(this.Investigation_category);


        } else {
          this.hiddengif = false;
          this.Investigation_category = [];

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

 //Add check box true in proc list 
  active_checkbox(diagnosisData){

    for(var i =  0; i < diagnosisData.length; i++){
      for(var j = 0; j < this.diagno_presc_patioent.length; j++){
        if (diagnosisData[i].item_code == this.diagno_presc_patioent[j].item_code) {
          debugger;
          diagnosisData[i].checkbox = true;
        }
      }
    }

  }

  create_category_list(vreate_categorylist) {
    var index = -1;
    var val = vreate_categorylist.item_code;
    var filteredObj = this.categorylist_array.find(function (item, i) {
      if (item.item_code === val) {
        index = i;
      }
    });

    if (index != -1) {
      this.categorylist_array.splice(index, 1);
    }
    else {
      if (vreate_categorylist.checkbox) {
        this.categorylist_array.push(vreate_categorylist);

        //distinct check
        for (var i = 0; i < this.diagno_presc_patioent.length; i++) {
          if (this.diagno_presc_patioent[i].item_code == vreate_categorylist.item_code) {
            this.openSnackBar("This Procedure is Already Raised , Please Select Another One", "Close");
            vreate_categorylist.checkbox = false;
            this.categorylist_array.splice(-1);
          } else { 
          }

        }
        //End of distinct check
      } else {

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

  save_cprocedure_diagnosis1(data_procedure) {
    console.log(data_procedure);
    this.GlobalService.enableloader();
    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        data_procedure.uhid_no = this.patientdata_details[i].UHIDNO;
        data_procedure.encounter_no = this.patientdata_details[i].EncounterNo;
      }
    }
    var nr = this.login_details[0]['nr'];
    var newarray = { "nr": nr, "chief_complaints": data_procedure, "uhid_no": data_procedure.uhid_no, "encounter_no": data_procedure.encounter_no };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/add_procedure_diagnosis', newarray).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.hidden = true;
        this.openSnackBar("Save Successully", "Close");
        this.categorylist_array = [];
        this.get_procedure_diag_patient(this.patientdata_details);
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! Please Retry", "Close");
      }
    })
  }

  save_procedure_notes(save_dd) {
    debugger;
    if (this.notes_data) {
      this.notes_data.notes = save_dd.notes;
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/pastencounter/update_procedure_diagnosis_notes', this.notes_data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.IsHidden = true;
        }
      });
    }
  }





}
