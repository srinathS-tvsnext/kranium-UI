import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, PageEvent } from '@angular/material';
import { TemplatenamePopupComponent } from '../templatename-popup/templatename-popup.component';
import { TemplatenameDrugPopupComponent } from '../templatename-drug-popup/templatename-drug-popup.component';
import { InvestigationTemplateComponent } from '../investigation-template/investigation-template.component';
import { OpsumaryTemplateNameComponent } from '../opsumary-template-name/opsumary-template-name.component';
import { UpdateMfOpsummaryTemplateNameComponent } from '../update-mf-opsummary-template-name/update-mf-opsummary-template-name.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-managefavourites',
  templateUrl: './managefavourites.component.html',
  styleUrls: ['./managefavourites.component.css']
})
export class ManagefavouritesComponent implements OnInit {
  login_details;
  opsummary_temp_id; opsummary_temp_name;
  tittle; barand_gen_name; dropdown_hide; sav_presc_temp; investi_btn; Investigation_menu;
  array; formdatactr; med; idarray; iddrugarray; med_drug; formdata_drug; template_drug_data; btn; btn_pres; template_pres_data;
  length_value; itemsperpages; itemsperpages_pres; itemsperpages_drug; itemsperpages_inv; length_value_opsummary;
  length_value_investigation;
  length_value_presc;
  firstNameControl = new FormControl();
  dialogRef; dialogRef_drug; template_pres_med_data; contenctdata; Investigation; Investigation_category; invest_caterogyname
  categorylist_array; Investigation_template; Investigation_template_category = []; hidden; opsummar_fav; opsummary_template_list;
  class_active; class_op_active; medicine_kranium_list; medicine_kranium_list1; medicine_kranium__brandname_list; newarray; hiddengif;
  // initialize for build
  investigation_kranium_list;
  pageSizeOptions = [5, 10, 25, 100];
  pageSizeOptions_drug = [5, 10, 25, 100];
  pageSizeOptions_pres = [5, 10, 25, 100];
  pageSizeOptions_inv = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput) {

    this.itemsperpages_drug = setPageSizeOptionsInput;
  }
  setPageSizeOptions_pesc(size) {
    this.itemsperpages_pres = size;
  }
  setPageSizeOptions_inv(sizes) {
    this.itemsperpages_inv = sizes;
  }
  setPageSizeOptions_op(sizess) {
    this.itemsperpages = sizess;
  }

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.investi_btn = "Add";
    this.sav_presc_temp = true;
    this.itemsperpages = 5;
    this.itemsperpages_pres = 5;
    this.itemsperpages_drug = 5;
    this.itemsperpages_inv = 5;
    this.length_value = 0;
    this.length_value_opsummary = 0;
    this.length_value_investigation = 0;
    this.length_value_presc = 0;
    this.med = {};
    this.med_drug = {};
    this.idarray = [];
    this.iddrugarray = [];

    this.btn = "Add";
    this.btn_pres = "Add";

    this.template_pres_med_data = [];
    this.get_Investigation();
    this.categorylist_array = [];
    this.get_investigation_template();
    this.hidden = true;
    this.opsummar_fav = {};
    this.get_opsummary_template();
    this.get_medicine_pres();
    this.get_medicine_drug();

    this.hiddengif = true;
  }
  //add_favouritesprescriptionmedicine

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  get_medicine_kranium_list(data_con) {
    // get_medicinelist

    this.hiddengif = false;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.dropdown_hide = true;
          if (resdata['ResponseObject'].length == 1) {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
            this.hiddengif = true;
            this.med_drug.generic_name = this.medicine_kranium_list[0].genericname;
            this.med_drug.brand_name = this.medicine_kranium_list[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list[0].genericname);
          }
          else {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
            this.hiddengif = false;
          }
        } else {
          this.dropdown_hide = false;
        }
      })
    } else {
      this.dropdown_hide = false;
    }
  }

  get_medicine_kranium_list1(data_con) {
    // get_medicinelist

    this.hiddengif = false;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.dropdown_hide = true;
          if (resdata['ResponseObject'].length == 1) {
            this.medicine_kranium_list1 = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list1);
            this.hiddengif = true;
            this.med.generic_name = this.medicine_kranium_list1[0].genericname;
            this.med.brand_name = this.medicine_kranium_list1[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list1[0].genericname);
          }
          else {
            this.medicine_kranium_list1 = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list1);
            this.hiddengif = false;
          }
        } else {
          this.dropdown_hide = false;
        }
      })
    }
    else {
      this.dropdown_hide = false;
    }
  }

  get_medicine_kranium_list_gen(data_con) {
    // get_medicinelist    
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list_gen', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.medicine_kranium_list = resdata['ResponseObject'];
          console.log(this.medicine_kranium_list);
        }
      })
    }

  }

  template_name(): void {
    this.dialogRef = this.dialog.open(TemplatenamePopupComponent, {
      data: {
        Id: this.idarray
      },
      disableClose: false
    })
    this.dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      this.get_medicine_pres();
      this.template_pres_med_data = [];

    });
  }

  //End ed for prescription

  add_medicine_drug(data) {
    if ((data.brand_name && data.generic_name && data.frequency && data.duration_no && data.duration_capt) == null) {
      this.openSnackBar("Please Enter the All Fields", "Close");
    } else {
      this.GlobalService.enableloader();
      console.log(data);
      if (this.medicine_kranium_list) {
        for (var i = 0; i < this.medicine_kranium_list.length; i++) {
          if (this.medicine_kranium_list[i].itemname = data.brand_name) {
            data.item_code = this.medicine_kranium_list[i].itemcode;
          }
        }
      }
      console.log(data);
      if (this.btn == "Update") {
        // update_favouritesdrugnmedicine
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_favouritesdrugnmedicine', data).subscribe(resdata => {
          console.log(resdata);
          if (resdata['IsSuccess']) {
            console.log(resdata['ResponseObject']);
            this.GlobalService.disableloader();
            this.btn = "Add";
            this.dialogRef_drug = this.dialog.open(TemplatenameDrugPopupComponent, {
              data: {
                Id: data
              },
              disableClose: false
            })
            this.dialogRef_drug.afterClosed().subscribe(() => {
              // unsubscribe onAdd
              this.get_medicine_drug();
            });
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Update Error ! Retry", "Close");
          }
        })
      } else {
        this.iddrugarray = [];
        this.btn = "Add";
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesdrugnmedicine', data).subscribe(resdata => {
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.iddrugarray.push({ "id": resdata['id'] });
            this.formdata_drug = resdata['data'];
            console.log(this.formdatactr);
            this.dialogRef_drug = this.dialog.open(TemplatenameDrugPopupComponent, {
              data: {
                Id: this.iddrugarray
              },
              disableClose: false
            })
            this.dialogRef_drug.afterClosed().subscribe(() => {
              // unsubscribe onAdd
              this.get_medicine_drug();
            });
            this.GlobalService.disableloader();
            this.openSnackBar("Added Successfully", "Close");
            this.get_medicine_drug();
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Added Error ! Retry", "Close");
          }
        })
      }
    }
  }

  //End ed for prescription
  // getcfav_drug
  get_medicine_drug() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_drug').subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.med_drug = {};
        this.template_drug_data = resdata['ResponseObject'];
        this.length_value = this.template_drug_data.length;
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  cancel_drug() {
    this.btn = "Add";
    this.med_drug = {};
  }

  edittemp_drug(data) {
    this.btn = "Update";
    console.log(data);
    this.barand_gen_name = [{ "itemname": data.brand_name }];
    this.med_drug = { "template_id": data.template_id, 'brand_name': data.brand_name, 'duration_capt': data.duration_capt, 'duration_no': data.duration_no, 'frequency': data.frequency, 'generic_name': data.generic_name, 'drug_template_map_id': data.drug_template_map_id };
  }
  //End code for drug

  //start Prescription
  // getcfav_pres
  get_medicine_pres() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_pres').subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.med = {};
        this.template_pres_data = resdata['ResponseObject'];
        this.length_value_presc = this.template_pres_data.length;
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  cancel_pres() {
    this.btn_pres = "Add";
    this.med = {};
  }
  cancel_tempprescription_master() {
    this.btn_pres = "Add";
    this.med = {};
    this.template_pres_med_data = [];
    this.contenctdata = [];
    this.sav_presc_temp = true;
  }
  clear_prestemp_name() {
    this.template_pres_med_data = [];
    this.sav_presc_temp = true;
  }

  edittemp_pres(data) {
    this.GlobalService.enableloader();
    this.sav_presc_temp = false;
    this.contenctdata = data;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_pres_medicine', this.contenctdata).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.med = {};
        this.template_pres_med_data = resdata['ResponseObject'];
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  editmedicine_pres(data) {
    // getcfav_pres_medicine
    this.btn_pres = "Update";
    this.barand_gen_name = [{ "itemname": data.brand_name, }];
    this.med = { "template_id": data.template_id, 'brand_name': data.brand_name, 'duration_capt': data.duration_capt, 'duration_no': data.duration_no, 'frequency': data.frequency, 'generic_name': data.generic_name, 'prescription_template_map_id': data.prescription_template_map_id };
  }
  // update_favouritespres_medicine
  deletemedicine_pres(data) {
    console.log(data);
    this.GlobalService.enableloader();
    var presc_id = [{ "presc_id": data.prescription_template_map_id }];
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/delete_temp_prescr', presc_id).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Delete Successfully", "Close");
      } else {
        this.openSnackBar("Please Retry", "Close");
        this.GlobalService.disableloader();
      }
    })
    if (this.template_pres_med_data) {
      for (var i = 0; i < this.template_pres_med_data.length; i++) {
        if (this.template_pres_med_data[i].prescription_template_map_id == data.prescription_template_map_id) {
          this.template_pres_med_data.splice(i, 1);
          // delete this.template_pres_med_data[i];
        }
      }
    }
  }

  add_medicine(data) {
    if ((data.brand_name && data.generic_name && data.frequency && data.duration_no && data.duration_capt) == null) {
      this.openSnackBar("Please Enter the All Fields", "Close");
    } else {
      if (this.medicine_kranium_list1) {
        for (var i = 0; i < this.medicine_kranium_list1.length; i++) {
          if (this.medicine_kranium_list1[i].itemname = data.brand_name) {
            data.item_code = this.medicine_kranium_list1[i].itemcode;
          }
        }
      }
      console.log(data);
      if (this.btn_pres == "Add") {
        if (this.contenctdata) {
          if (this.contenctdata.length == 0) {
            data.temp_id = '';
          }
          else {
            data.temp_id = this.contenctdata.manage_favourites_prescription_id;
          }
        }

        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesprescriptionmedicine', data).subscribe(resdata => {
          if (resdata['IsSuccess']) {
            this.template_pres_med_data = resdata['data'];
            console.log(this.template_pres_med_data);
            this.med = [];
            var uniqueid = [];
            var uniqueobject = [];
            for (var i = 0; i < this.template_pres_med_data.length; i++) {
              if (uniqueid.indexOf(this.template_pres_med_data[i].item_code) === -1) {
                uniqueid.push(this.template_pres_med_data[i].item_code);
                uniqueobject.push(this.template_pres_med_data[i]);
                this.idarray.push({ "id": this.template_pres_med_data[i].prescription_template_map_id });
              }
            }
            this.template_pres_med_data = uniqueobject;
            console.log(uniqueobject);

            console.log(this.template_pres_med_data);
            this.formdatactr = resdata;

            if (this.contenctdata) {
              this.edittemp_pres(this.contenctdata);
            }
            console.log(this.formdatactr);
            this.GlobalService.disableloader();
            // this.template_pres_med_data = [];
            this.openSnackBar("Added Successfully", "Close");
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Added Error ! Retry", "Close");
          }
        })
      }
      else {
        this.GlobalService.enableloader();
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_favouritespres_medicine', data).subscribe(resdata => {
          console.log(resdata);
          if (resdata['IsSuccess']) {
            this.edittemp_pres(this.contenctdata);
            this.GlobalService.disableloader();
            this.openSnackBar("Updated Successfully", "Close");
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Updated Error ! Retry", "Close");
          }
        })
      }
    }
  }

  favs = [
    { value: 'steak-0', viewValue: 'Favourite Type 1' },
    { value: 'pizza-1', viewValue: 'Favourite Type 2' },
    { value: 'tacos-2', viewValue: 'Favourite Type 3' },
    { value: 'umm-2', viewValue: 'Favourite Type 4' }
  ];
  favdrgs = [
    { value: 'steak-0', viewValue: 'Drug Type 1' },
    { value: 'pizza-1', viewValue: 'Drug Type 2' },
    { value: 'tacos-2', viewValue: 'Drug Type 3' },
    { value: 'umm-2', viewValue: 'Drug Type 4' }
  ];
  langs = [
    { value: 'steak-0', viewValue: 'English' },
    { value: 'pizza-1', viewValue: 'Hindi' },
    { value: 'tacos-2', viewValue: 'Tamil' }
  ];

  days = [
    { value: 'steak-0', viewValue: '0' },
    { value: 'steak-0', viewValue: '1' },
    { value: 'pizza-1', viewValue: '2' },
    { value: 'tacos-2', viewValue: '3' },
    { value: 'umm-2', viewValue: '4' }
  ];

  prescr = [
    { value: 'steak-0', viewValue: '1 - 0 - 1' },
    { value: 'steak-0', viewValue: '1 - 1 - 1' },
    { value: 'pizza-1', viewValue: '0 - 1 - 0' },
    { value: 'tacos-2', viewValue: '1 - 1 - 0' },
    { value: 'umm-2', viewValue: '0 - 1 - 1' }
  ]
  day = [
    { value: 'Days', viewValue: 'Days' },
    { value: 'Weeks', viewValue: 'Weeks' },
    { value: 'Months', viewValue: 'Months' }
  ];

  meds = [
    { value: 'steak-0', viewValue: 'After Food' },
    { value: 'pizza-1', viewValue: 'Before Food' }
  ];
  Route = [
    { value: 'steak-0', viewValue: 'Oral' },
    { value: 'pizza-1', viewValue: 'Injection' }
  ];
  prep = [
    { value: 'steak-0', viewValue: 'Tablet' },
    { value: 'pizza-1', viewValue: 'Syrup' }
  ];

  op = [
    { value: 'steak-0', viewValue: 'Favorite Type 1' },
    { value: 'steak-0', viewValue: 'Favorite Type 2' },
    { value: 'pizza-1', viewValue: 'Favorite Type 3' }
  ];
  //Investigation List
  // get_investifation_department_masters
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

  get_Investigation() {
    this.GlobalService.enableloader();

    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_investifation_department_masters').subscribe(resdata => {
      if (resdata['IsSuccess']) {

        this.Investigation = resdata['ResponseObject'];
        console.log(this.Investigation);
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  get_Investigation_category_list(data_invest_id) {
    this.hidden = false;
    this.categorylist_array = [];
    this.Investigation_template_category = [];

    var id = data_invest_id.nr
    this.invest_caterogyname = data_invest_id.name_formal;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Common/get_investifation_masters', id).subscribe(resdata => {
      if (resdata['IsSuccess']) {

        this.Investigation_category = resdata['ResponseObject'];
      }
    })
  }

  create_category_list(vreate_categorylist) {

    this.categorylist_array.push(vreate_categorylist);

    var uniqueid = [];
    var uniqueobject = [];
    for (var i = 0; i < this.categorylist_array.length; i++) {
      if (uniqueid.indexOf(this.categorylist_array[i].item_code) === -1) {
        uniqueid.push(this.categorylist_array[i].item_code);
        uniqueobject.push(this.categorylist_array[i]);
      }
    }
    this.categorylist_array = uniqueobject;
    console.log(uniqueobject);
  }

  remove_temp(rem_cat) {

    if (this.categorylist_array) {
      for (var i = 0; i < this.categorylist_array.length; i++) {
        if (this.categorylist_array[i].item_code == rem_cat.item_code) {
          this.categorylist_array.splice(i, 1);
        }
      }
      for (var j = 0; j < this.Investigation_category.length; j++) {
        if (this.Investigation_category[j].item_code == rem_cat.item_code) {
          this.Investigation_category[j].checkbox = false;
        }
      }
    }
  }
  save_investigation() {
    console.log(this.categorylist_array);

    if (this.investi_btn == "Add") {
      if (this.categorylist_array.length != 0) {
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_fav_Inestigation_catogory', this.categorylist_array).subscribe(resdata => {
          if (resdata['IsSuccess']) {

            console.log(resdata['ResponseObject']);
            var data_id = resdata['ID'];
            this.pop_InvestigationComponent(data_id);
            this.investi_btn = "Add";
          }
        })
      }
    }
  }
  update_investigation(category_tem) {
    if (this.categorylist_array.length != 0) {
      category_tem[0].data_new = this.categorylist_array;
    }

    if (this.investi_btn == "Update") {
      if (category_tem.length != 0) {
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/upadte_fav_Inestigation_catogory', category_tem).subscribe(resdata => {
          if (resdata['IsSuccess']) {

            console.log(resdata['ResponseObject']);
            this.Investigation_template_category = [];
            this.categorylist_array = [];
            this.Investigation_menu = '';
            this.Investigation_category = [];
            this.investi_btn = "Add";
            this.hidden = true;
            this.openSnackBar("Updated Successfully", "Close");
          }
        })
      }
    }
  }
  pop_InvestigationComponent(data_id) {
    this.dialogRef = this.dialog.open(InvestigationTemplateComponent, {
      data: {
        Id: data_id
      },
      disableClose: false
    })

    this.dialogRef.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      this.get_investigation_template();
    });
  }

  get_investigation_template() {
    this.GlobalService.enableloader();
    // get_fav_investigation_template
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_fav_investigation_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.Investigation_template = resdata['ResponseObject'];
        this.length_value_investigation = this.Investigation_template.length;
        console.log(this.Investigation_template);
        this.GlobalService.disableloader();
        this.Investigation_category = [];
        this.Investigation_template_category = [];
        this.Investigation_menu = "";
        this.categorylist_array = [];
        this.hiddengif = true;
        this.hidden = true;
        // this.investigation_kranium_list = [];

      } else {
        this.GlobalService.disableloader();
      }
    })
  }


  edit_investigation_temp(data) {
    // get_fav_investigation_list
    this.investi_btn = "Update";
    this.hidden = true;
    this.categorylist_array = [];
    this.Investigation_category = [];
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/get_fav_investigation_list', data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.Investigation_template_category = resdata['ResponseObject'];
        console.log(this.Investigation_template_category);
      }
    })
  }
  removeall() {
    this.Investigation_template_category = [];
    this.investi_btn = "Add";
  }
  remove_old_tempdata_investigation(old_temp_data) {
    if (confirm("Are you sure Delete")) {
      this.GlobalService.enableloader();
      console.log(old_temp_data);

      if (this.Investigation_template_category) {
        for (var i = 0; i < this.Investigation_template_category.length; i++) {
          for (var j = 0; j < this.Investigation_template_category[i].question.length; j++) {
            if (this.Investigation_template_category[i].question[j].item_code == old_temp_data.item_code) {
              // this.Investigation_category[i].checkbox = false;
              this.Investigation_template_category[i].question.splice(j, 1);
            }
          }
        }
        console.log(this.Investigation_template_category);
      }

      old_temp_data.nr = this.login_details[0]['nr'];
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/delete_Inestigation_catogory', old_temp_data).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          this.openSnackBar("Delete Successully", "Close");
        } else {
          this.GlobalService.disableloader();
        }
      })
    }
  }

  //Opsummary Manage favourites
  save_opsummary(data) {
    console.log(data);

    this.array = { "acces": data, "opsum_tempid": this.opsummary_temp_id, "opsum_tempname": this.opsummary_temp_name };

    this.dialogRef_drug = this.dialog.open(OpsumaryTemplateNameComponent, {
      data: {
        Id: this.array
      },
      disableClose: false
    })
    this.dialogRef_drug.afterClosed().subscribe(() => {
      this.get_opsummary_template();
    });
    // add_roles
  }
  get_opsummary_template() {
    // get_opsummary_template
    this.GlobalService.enableloader();

    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/get_opsummary_template').subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.opsummary_template_list = resdata['ResponseObject'];
        this.length_value_opsummary = this.opsummary_template_list.length;
        console.log(this.opsummary_template_list);
        this.GlobalService.disableloader();
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  addnew_opsumm() {
    this.opsummar_fav = {};
    this.opsummary_temp_id = "";
    this.opsummary_temp_name = "";
  }
  edit_opsummary(data_opsummary) {
    console.log(data_opsummary);
    this.opsummary_temp_id = data_opsummary.manage_favourites_opsummary_id;
    this.opsummary_temp_name = data_opsummary.template_name;
    this.tittle = data_opsummary.template_name;
    this.opsummar_fav = JSON.parse(data_opsummary.opsummary_template);
  }
  //autosearch api
  get_medicine_kranium_cat_list_gen(data_con) {

    this.hiddengif = false;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con }; this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_all_investigation_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          this.hiddengif = true;
          this.hidden = false;
          this.Investigation_category = resdata['ResponseObject'];
          //searchbox style class add
          var invlist = this.Investigation_category;
          if (invlist.length < 10) {
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.add("myboxsize");
          } else {
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.remove("myboxsize");
          }
          //end of searchbox style class
        } else {
          this.hiddengif = false;
        }
      });
    } else {
      if (data_con.length < 2) {
        this.hiddengif = true;
        this.hidden = true;
        this.Investigation_category = [];
      } else {
        this.hiddengif = false;
      }
    }
  }

  edit_presc_panel(pres_data) {
    this.dialogRef_drug = this.dialog.open(TemplatenamePopupComponent, {
      data: {
        Id: pres_data
      },
      disableClose: false
    })
    this.dialogRef_drug.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      this.get_medicine_pres();
    });

  }
  edit_drug_panel(drug_data) {
    this.dialogRef_drug = this.dialog.open(TemplatenameDrugPopupComponent, {
      data: {
        Id: drug_data
      },
      disableClose: false
    })
    this.dialogRef_drug.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      this.get_medicine_drug();
    });
  }
  edit_inv_panel(inv_data) {
    this.dialogRef_drug = this.dialog.open(InvestigationTemplateComponent, {
      data: {
        Id: inv_data
      },
      disableClose: false
    })
    this.dialogRef_drug.afterClosed().subscribe(() => {
      // unsubscribe onAdd
      this.get_investigation_template();
    });

  }
  edit_op_panel(op_data) {
    console.log(op_data);
    this.dialogRef_drug = this.dialog.open(UpdateMfOpsummaryTemplateNameComponent, {
      data: {
        temp_details: op_data
      },
      disableClose: false
    })
    this.dialogRef_drug.afterClosed().subscribe(() => {
      this.get_opsummary_template();
    });
  }
  genericby_brandname(gen_brand) {

    this.newarray = { "searchdata": gen_brand };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list_gen', this.newarray).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.barand_gen_name = resdata['ResponseObject'];
        console.log(this.barand_gen_name);
      }
    })
  }

  data_click_bind(data_cc) {

    this.med.brand_gen_name = data_cc;
    this.dropdown_hide = false;
    this.get_medicine_kranium_list_forcustomdropdown(data_cc);
  }
  data_click_bind_prec(data_ccs) {

    this.med_drug.brand_genric_name = data_ccs;
    this.dropdown_hide = false;
    this.get_medicine_kranium_list_prescription(data_ccs);
  }

  get_medicine_kranium_list_forcustomdropdown(data_con) {
    // get_medicinelist

    if (data_con.length) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          // this.dropdown_hide = true;
          this.medicine_kranium_list1 = resdata['ResponseObject'];
          console.log(this.medicine_kranium_list);
          if (resdata['ResponseObject']) {
            this.med.generic_name = this.medicine_kranium_list1[0].genericname;
            this.med.brand_name = this.medicine_kranium_list1[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list1[0].genericname);
          } else {
            this.medicine_kranium_list1 = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list1);
          }

        }
      })
    }
    else {
      this.dropdown_hide = false;
    }
  }
  get_medicine_kranium_list_prescription(data_con) {
    // get_medicinelist

    this.hiddengif = false;
    if (data_con.length) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          if (resdata['ResponseObject'].length == 1) {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
            this.hiddengif = true;
            this.med_drug.generic_name = this.medicine_kranium_list[0].genericname;
            this.med_drug.brand_name = this.medicine_kranium_list[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list[0].genericname);
          }
          else {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
            this.hiddengif = false;
          }
        } else {
          this.dropdown_hide = false;
        }
      })
    } else {
      this.dropdown_hide = false;
    }
  }




  clickMethod_presc(data, name: string) {

    if (confirm("Are you sure to delete " + name)) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/delete_prescription_template', data).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.openSnackBar("Deleted Successfully", "Close");
          this.get_medicine_pres();
        }
      })
    }
  }
  clickMethod_drug(data, name: string) {

    if (confirm("Are you sure to delete " + name)) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/delete_drug_template', data).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.openSnackBar("Deleted Successfully", "Close");
          this.get_medicine_drug();
        }
      })
    }
  }
  clickMethod_inves(data, name: string) {

    if (confirm("Are you sure to delete " + name)) {
      // delete_investigation_template
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/delete_investigation_template', data).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.openSnackBar("Deleted Successfully", "Close");
          this.get_investigation_template();
          this.Investigation_template_category = [];
          this.investi_btn = "Add";
        }
      })

    }
  }
  clickMethod_opsum(data, name: string) {

    if (confirm("Are you sure to delete " + name)) {
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/delete_opsummary_template', data).subscribe(resdata => {
        if (resdata['IsSuccess']) {

          this.openSnackBar("Deleted Successfully", "Close");
          this.get_opsummary_template();
        }
      })
    }
  }
}
