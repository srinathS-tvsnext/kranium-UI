import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
// import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-duplicate-form',
  templateUrl: './duplicate-form.component.html',
  styleUrls: ['./duplicate-form.component.css']
})
export class DuplicateFormComponent implements OnInit {

  constructor(private http: HttpClient, private GlobalService: GlobalService,
    private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { }
  page; sub; id; arrayss; formdatacr; array; choice;
  DoctorsName; Departmentname; historymaninName;
  tem_name;
  ngOnInit() {
    this.choice = {};
    this.get_DoctorsName();
    this.get_Departmet();
    this.get_historyfomname();
    this.detail_view();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  answertypeval(val, choices) {
    debugger;
    if (val == '1' || val == '2') {
      choices.character_lengths = true;
      choices.character_length = '';
      choices.question_option = [];
      choices.options_counts = false;
    } else if (val == '3' || val == '4' || val == '5') {
      choices.options_counts = true;
      choices.options_count = '';
      choices.character_lengths = false;
    } else {
      choices.character_lengths = false;
      choices.character_length = '';
      choices.options_count = '';
      choices.options_counts = false;
    }
  }


  valuechange(choices) {
    debugger;
    choices.question_option = [];
    if (choices.options_count != null && choices.options_count != 0) {
      for (var i = 1; i <= choices.options_count; i++) {
        debugger;

        choices.question_option.push({ id: "new" + i });
      }
      console.log(choices.question_option);
    }
    else {
      choices.question_option = [];
    }
  }


  testfield = [
    { value: '1', viewValue: 'Text Box' },
    { value: '2', viewValue: 'Text Area' },
    { value: '3', viewValue: 'Radio Button' },
    { value: '4', viewValue: 'Check Box' },
    { value: '5', viewValue: 'Drop Down' }
  ];
  docname = [
    { value: '1', viewValue: 'Examination' },
    { value: '2', viewValue: 'History' }
  ];
  detail_view() {
    debugger;
    this.sub = this.route.snapshot.params['id'];
    this.array = { data: this.sub };
    console.log(this.array);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_formdetailview', this.array).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        debugger;
        this.formdatacr = resdata;
        for (var i = 0; i < this.formdatacr.length; i++) {
          for (var j = 0; j < this.formdatacr[i].question.length; j++) {
            if (this.formdatacr[i].question[j].options_count != 0) {
              this.formdatacr[i].question[j].options_counts = true;
              this.formdatacr[i].question[j].character_lengths = false;
            } else if (this.formdatacr[i].question[j].character_length != 0) {
              this.formdatacr[i].question[j].character_lengths = true;
              this.formdatacr[i].question[j].options_counts = false;
            } else {
              this.formdatacr[i].question[j].character_lengths = false;
              this.formdatacr[i].question[j].options_counts = false;
            }
          }
        }
      }
    });
  }


  //masters
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
  get_historyfomname() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/gethistory_form_name').subscribe(resdata => {
      debugger;
      if (resdata) {
        debugger;
        this.GlobalService.disableloader();
        this.historymaninName = resdata['ResponseObject'];
        debugger;
      } else {
        this.GlobalService.disableloader();
      }
    })
  }


  clone_save(save) {
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/User/clone_form', save).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        console.log(resdata['ResponseObject']);
        this.openSnackBar("Cloned Successfully", "Close");
        this.router.navigate(['/Homescreen/Manageforms']);
      } else {
        this.openSnackBar("Error? Retry", "Close");
      }
      // routerLink='/Manageforms'
    })
  }

}
