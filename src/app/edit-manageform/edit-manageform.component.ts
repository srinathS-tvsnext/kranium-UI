import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-edit-manageform',
  templateUrl: './edit-manageform.component.html',
  styleUrls: ['./edit-manageform.component.css']
})
export class EditManageformComponent implements OnInit {

  page; sub; id; arrayss; formdatacr; array; choice;
  DoctorsName; Departmentname; historymaninName;
  choices; deleteic; addic; lengthss; count;login_details;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
  
    this.formdatacr = [{ id: 1, q_name: '', a_type: '', c_length: '', o_count: '', lengthss: false, count: false, optioncc: [], addbtn: 0 }];
    this.deleteic = false;
    this.addic = false;
    this.viewfor();
    this.get_DoctorsName();
    this.get_Departmet();
    this.get_historyfomname();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  addnew() {
    debugger;
    if (this.formdatacr[0].question.length >= 1) {
      this.addic = false;
      this.deleteic = false;
    }
    var newItemNo = this.formdatacr[0].question.length + 1;
    this.formdatacr[0].question.push({ id: newItemNo, q_name: '', a_type: '', c_length: '', o_count: '', lengthss: false, count: false, optioncc: [], addbtn: 1 });
    this.lengthss = false;
    this.count = false;
  }

  delete(choicesss) {

    if(confirm("Are you sure delete this question?")){
      this.GlobalService.enableloader();
      choicesss.nr = this.login_details[0]['nr'];
      if (this.formdatacr[0].question.length <= 2) {
        this.addic = false;
        this.deleteic = true;
      }
      var edt_ques = this.formdatacr[0].question;
      for (var i = 0; i < edt_ques.length; i++) {
        if (edt_ques[i]['question_id'] === choicesss.question_id) {
          edt_ques.splice(i, 1);
          break;
        }
      }
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/delete_ques_view', choicesss).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.viewfor();
          this.GlobalService.disableloader();
          this.openSnackBar("Deleted Successully", "Close");
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error! Please Retry", "Close");
        }
      })
    }
  }

  viewfor() {
    this.sub = this.route.snapshot.params['id'];
    console.log(this.sub);
    this.array = { data: this.sub };
    console.log(this.array);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_formdetailview', this.array).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata) {
        debugger;
        this.formdatacr = resdata;
        console.log(this.formdatacr);
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
    })
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

  update(data_edit) {
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/edit_formdetailview', data_edit).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.openSnackBar("Updated Successfully !", "Close");
        this.router.navigate(['/Homescreen/Manageforms']);
      }
    })
  }

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
}
