import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrescriptionshortageComponent } from '../prescriptionshortage/prescriptionshortage.component';
import { MatSnackBar } from '@angular/material';
import { TemplatenamePopupComponent } from '../templatename-popup/templatename-popup.component';
import { TemplatenameDrugPopupComponent } from '../templatename-drug-popup/templatename-drug-popup.component';
import { GlobalService } from '../global.service';
import * as _ from 'lodash';

const NUMBER_REGEX = /^[0-9]*$/;

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  date_status;
  edit; food; dialogRef; patientdata_details; old_prescription; medicine_kranium_list; medicine_kranium_list_new_test; newarray; new_resdata;
  array; formdatactr; med; idarray; iddrugarray; med_drug; formdata_drug; template_drug_data; btn; btn_pres; template_pres_data;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }
  freqquantity; arr; barand_gen_name; dropdown_hide;route_data;
  dialogRef_drug; template_pres_med_data; contenctdata; hide; showGreeting; exampleDatas; items;
  brandname; pres_data; acess_rights; tmp; logindata_details;pres_diet;sampRoutedata;freaquencyloop =[];
  language_list; language_mrg; language_aftn; language_eve; language_nigt; language_bf; language_af;
  datevalidation; pres_doct; hide_editbtn; dietadvice; language; notes; minDt = new Date();
  ngOnInit() {

    this.date_status = JSON.parse(sessionStorage.getItem('datestatus'));
    this.dropdown_hide = false;
    this.medicine_kranium_list_new_test = [];
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
    this.new_resdata = [{}];
    this.arr = [];
    this.old_prescription = [];
    this.template_pres_med_data = [];

    this.old_prescription = JSON.parse(sessionStorage.getItem("previous_prescription"));

  
    console.log(this.old_prescription);
    this.patientdata_details = JSON.parse(sessionStorage.getItem('patientdata'));
    this.logindata_details = JSON.parse(sessionStorage.getItem('logindata'));
    this.datevalidation = JSON.parse(sessionStorage.getItem('datestatus'));
    this.get_route(this.patientdata_details);
    this.med = {};
    this.med_drug = {};
    this.idarray = [];
    this.iddrugarray = [];

    this.get_medicine_drug();
    this.btn = "Add";
    this.btn_pres = "Add";
    this.get_medicine_pres();
    this.food = '1';

    this.get_pres(this.patientdata_details);
    this.get_pres_doct(this.patientdata_details);
  //  this.get_language();
    this.get_Diet(this.patientdata_details);
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

  // add_favouritesprescriptionmedicine

  prev_pp(old_prescription) {
    // for (var j = 0; j < old_prescription.length; j++) {
    this.quanity_sss(old_prescription);
    // }
  }


  template_name(): void {
    this.dialogRef = this.dialog.open(TemplatenamePopupComponent, {
      data: {
        Id: this.idarray
      },
      disableClose: false
    })
  }
  // End ed for prescription


  add_medicine_drug(data) {
    debugger;
    console.log(data);
    if (this.btn == "Update") {
      this.GlobalService.enableloader();
      // update_favouritesdrugnmedicine
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_favouritesdrugnmedicine', data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          console.log(resdata['ResponseObject']);
          this.get_medicine_drug();
        } else {
          this.GlobalService.disableloader();
        }
      })
    } else {
      this.GlobalService.enableloader();
      this.btn = "Add";
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesdrugnmedicine', data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          this.iddrugarray.push({ "id": resdata['id'] })
          this.formdata_drug = resdata['data'];
          console.log(this.formdatactr);
          this.dialogRef_drug = this.dialog.open(TemplatenameDrugPopupComponent, {
            data: {
              Id: this.iddrugarray
            },
            disableClose: false
          })
          this.get_medicine_drug();
        } else {
          this.GlobalService.disableloader();
        }
      })
    }
  }

  // End ed for prescription
  // getcfav_drug
  get_medicine_drug() {
    this.GlobalService.enableloader();
    debugger;

    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_drug').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.med_drug = {};
        this.template_drug_data = resdata['ResponseObject'];
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
    this.hide = false;
    debugger;
    console.log(data);
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/check_medicine_quantity_drug', data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        var tmp = resdata['ResponseObject'][0];
        if (this.template_pres_med_data.length != 0) {
          debugger;

          if (this.template_pres_med_data.indexOf(data.item_code) == -1) {
            data.quantitystatus = true;
            data.new_id = this.template_pres_med_data.length + 1;
            this.template_pres_med_data.push(data);
          }

        } else {
          data.quantitystatus = true;
          data.new_id = this.template_pres_med_data.length + 1;
          this.template_pres_med_data.push(data);
        }
        console.log(this.template_pres_med_data);
        var uniqueid = [];
        var uniqueobject = [];
        for (var i = 0; i < this.template_pres_med_data.length; i++) {
          if (uniqueid.indexOf(this.template_pres_med_data[i].item_code) === -1) {
            uniqueid.push(this.template_pres_med_data[i].item_code);
            uniqueobject.push(this.template_pres_med_data[i]);
          }
        }
        this.template_pres_med_data = uniqueobject;
      }
    })
  }
  //End code for drug
  edittemp_drug_new(data) {
    this.hide_editbtn = true;
    this.hide = false;
    this.btn = "Update";
    console.log(data);
    this.barand_gen_name = [{ 'itemname': data.brand_name }];
    this.med = { 'brand_name': data.brand_name, 'duration_capt': data.duration_capt, 'duration_no': data.duration_no, 'frequency': data.frequency,'timing': data.timing, 'generic_name': data.generic_name, 'drug_template_map_id': data.drug_template_map_id, "item_code": data.item_code, "startDate": data.startDate, "route": data.route, "notes":data.notes };
  }

  //start Prescription
  // getcfav_pres
  get_medicine_pres() {
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_pres').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.template_pres_data = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }
  cancel_pres() {
    this.hide_editbtn = false;
    this.btn = "Add";
    this.med = {};
  }
  cancel_tempprescription_master() {
    debugger;
    this.btn = "Add";
    this.med = {};
    this.template_pres_med_data = [];
    this.contenctdata = [];
  }

  edittemp_pres(data) {
    this.hide = true;
    // getcfav_pres_medicine
    this.contenctdata = data;
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_pres_medicine', data).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        console.log(data);
        this.quanity_sss(resdata['ResponseObject']);
        

      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  quanity_sss(resdata) {
    debugger;
    // let route = {};
 this.sampRoutedata =  this.route_data.find(rout => { return rout.name == resdata[0].Route.toUpperCase()})
    this.new_resdata[0].brand_name = resdata[0].brand_name || resdata[0].Medicine_Name;
    this.new_resdata[0].duration_capt = resdata[0].duration_capt || resdata[0].Medicine_Timing;
    this.new_resdata[0].duration_no = resdata[0].duration_no || resdata[0].Duration;
    this.new_resdata[0].frequency = resdata[0].frequency || resdata[0].Frequency;
    this.new_resdata[0].item_code = resdata[0].item_code;
    this.new_resdata[0].quantity = resdata[0].quantity;
    this.new_resdata[0].notes = resdata[0].Notes;
    this.new_resdata[0].timing = resdata[0].food_time;
    this.new_resdata[0].generic_name = resdata[0].generic_name;
    this.new_resdata[0].routename = this.sampRoutedata.name;
    this.new_resdata[0].route = this.sampRoutedata.nr; 
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/check_medicine_quantity', resdata).subscribe(resbeedata => {
      if (resbeedata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.tmp = resbeedata['ResponseObject'];
        console.log(this.tmp);
        for (var q = 0; q < this.new_resdata.length; q++) {
          if (this.template_pres_med_data.length != 0) {
            debugger;

            if (this.template_pres_med_data.indexOf(this.new_resdata[q].item_code) == -1) {
              this.new_resdata[q].quantitystatus = true;
              this.new_resdata[q].new_id = this.template_pres_med_data.length + 1;
              this.template_pres_med_data.push(this.new_resdata[q]);
            }

          } else {
            this.new_resdata[q].quantitystatus = true;
            this.new_resdata[q].new_id = this.template_pres_med_data.length + 1;
            this.template_pres_med_data.push(this.new_resdata[q]);
          }
          console.log(this.template_pres_med_data);
          var uniqueid = [];
          var uniqueobject = [];
          for (var i = 0; i < this.template_pres_med_data.length; i++) {
            if (uniqueid.indexOf(this.template_pres_med_data[i].item_code) === -1) {
              uniqueid.push(this.template_pres_med_data[i].item_code);
              uniqueobject.push(this.template_pres_med_data[i]);
            }
          }
          this.template_pres_med_data = uniqueobject;
          console.log(uniqueobject);
        }
      } else {
        this.GlobalService.disableloader();
        console.log("error");
      }
    });
  }
  onlyUnique(value, index, self) {
    debugger;
    console.log(self.indexOf(value.item_code) === index);
    return self.indexOf(value.item_code) === index;
  }


  new_quantity_final(tmp) {
    debugger;
    if (tmp['IsSuccess']) {
      var tmptt = tmp['ResponseObject'][0];
      if (tmptt.quantity < this.new_resdata.quantity) {
        if (this.template_pres_med_data.length != 0) {
          for (var i = 0; i < this.template_pres_med_data.length; i++) {
            if (this.template_pres_med_data[i].item_code == tmptt.item_code) {
            } else {
              this.new_resdata.quantitystatus = true;
              this.template_pres_med_data.push(this.new_resdata);
            }
          }
        } else {
          this.new_resdata.quantitystatus = true;
          this.template_pres_med_data.push(this.new_resdata);
        }
        this.GlobalService.disableloader();
      } else {
        if (this.template_pres_med_data.length != 0) {
          for (var i = 0; i < this.template_pres_med_data.length; i++) {
            if (this.template_pres_med_data[i].item_code == this.new_resdata.item_code) {
            } else {
              this.new_resdata.quantitystatus = false;
              this.new_resdata.new_id = i;
              this.template_pres_med_data.push(this.new_resdata);
            }
          }
        } else {
          this.new_resdata.quantitystatus = false;
          this.new_resdata.new_id = i;
          this.template_pres_med_data.push(this.new_resdata);
        }
        this.GlobalService.disableloader();
      }
    }
  }


  deteletemp_drug_new(data) {
    debugger;
    if (this.template_pres_med_data) {
      for (var i = 0; i < this.template_pres_med_data.length; i++) {
        if (this.template_pres_med_data[i].new_id == data.new_id) {
          this.template_pres_med_data.splice(i, 1);
        }
      }
    }
  }
  editmedicine_pres(data) {
    // getcfav_pres_medicine
    this.hide = true;
    this.btn = "Update";
    debugger;
    console.log(data);
    this.med = { 'brand_name': data.brand_name, 'duration_capt': data.duration_capt, 'duration_no': data.duration_no, 'frequency': data.frequency, 'generic_name': data.generic_name, 'prescription_template_map_id': data.prescription_template_map_id };
  }
  // update_favouritespres_medicine
  add_medicine(data) {
    debugger;
    console.log(data);
    if (this.btn_pres == "Add") {
      if (this.contenctdata.length == 0) {
        data.temp_id = '';
      } else {
        data.temp_id = this.contenctdata.manage_favourites_prescription_id;
      }
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesprescriptionmedicine', data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          this.idarray.push({ "id": resdata['id'] })
          this.template_pres_med_data = resdata['data'];
          this.formdatactr = resdata;
          this.edittemp_pres(this.contenctdata);
          console.log(this.formdatactr);
        } else {
          this.GlobalService.disableloader();
        }
      })
    }
    else {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/update_favouritespres_medicine', data).subscribe(resdata => {
        debugger;
        console.log(resdata);
        if (resdata['IsSuccess']) {
          this.GlobalService.disableloader();
          debugger;
          this.edittemp_pres(this.contenctdata);

        } else {
          this.GlobalService.disableloader();
        }
      })
    }

  }
  add(a, b) {
    return a + b;
  }

  validDate(){
    this.med
  }
  add_medicine_temperary(data) {
    debugger;
    this.hide_editbtn = false;
    if ((data.brand_name && data.generic_name) == undefined) {
      this.openSnackBar("Please Enter Brand name and Generic name details", "Close");
    } else {
      debugger;
      // get route name
     data.routeName = this.route_data.find(x=> x.nr == data.route).name

      if (this.btn == "Add") {
        if (this.medicine_kranium_list) {
          for (var i = 0; i < this.medicine_kranium_list.length; i++) {
            if (this.medicine_kranium_list[i].itemname == data.brand_name) {
              data.item_code = this.medicine_kranium_list[i].itemcode;
            }
          }
        }
        if (this.barand_gen_name) {
          for (var i = 0; i < this.barand_gen_name.length; i++) {
            if (this.barand_gen_name[i].itemname == data.brand_name) {
              data.item_code = this.barand_gen_name[i].itemcode;
            }
          }
        }
      }
      this.arr = [];
      this.freqquantity = data.frequency.split("-");
      for (var i = 0; i < this.freqquantity.length; i++) {
        var newdaa = this.freqquantity[i].trim();
        if (newdaa == "1") {
          this.arr.push(parseInt(newdaa));
        }
      }
      var sum = this.arr.reduce(this.add, 0);


      if (data.duration_capt == "Days") {
        var dur = parseInt(data.duration_no);
        data.quantity = sum * dur * 1;
      }
      if (data.duration_capt == "Weeks") {
        var dur = parseInt(data.duration_no);
        data.quantity = sum * dur * 7;
      }
      if (data.duration_capt == "Months") {
        var dur = parseInt(data.duration_no);
        data.quantity = sum * dur * 30;
      }
      this.newarray = [];
      console.log(sum);
      this.newarray.push(data);
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/check_medicine_quantity', this.newarray).subscribe(resdata => {


        if (resdata['IsSuccess']) {
          debugger;
          console.log(resdata['ResponseObject']);
          var tmp = resdata['ResponseObject'][0];
          if (tmp.quantity < data.quantity) {
            data.quantitystatus = true;
            data.totalquantity = resdata['ResponseObject'][0];
            if (this.btn == "Update") {
              for (var i = 0; i < this.template_pres_med_data.length; i++) {
                if (this.template_pres_med_data[i].item_code == data.item_code) {
                  // this.template_pres_med_data[i].item_code ==
                  this.template_pres_med_data[i].item_code = data.item_code;
                  this.template_pres_med_data[i].brand_name = data.brand_name;
                  this.template_pres_med_data[i].duration_capt = data.duration_capt;
                  this.template_pres_med_data[i].duration_no = data.duration_no;

                  this.template_pres_med_data[i].frequency = data.frequency;
                  this.template_pres_med_data[i].timing = data.timing;
                  this.template_pres_med_data[i].generic_name = data.generic_name;
                  this.template_pres_med_data[i].quantity = data.quantity;
                  this.template_pres_med_data[i].quantitystatus = data.quantitystatus;
                  this.template_pres_med_data[i].notes = data.notes;
                  // this.template_pres_med_data[i].routeValueName = data.routeName //

                }
              }
              this.btn = "Add";
            } else {
              this.template_pres_med_data.push(data);
            }
            console.log(this.template_pres_med_data);
            this.med = {};
          } else {
            data.quantitystatus = false;
            this.template_pres_med_data.push(data);
            console.log(this.template_pres_med_data);
            for (var i = 0; i < this.template_pres_med_data.length; i++) {
              if (this.template_pres_med_data[i].item_code == data.item_code) {
                this.template_pres_med_data[i].item_code = data.item_code;
                this.template_pres_med_data[i].brand_name = data.brand_name;
                this.template_pres_med_data[i].duration_capt = data.duration_capt;
                this.template_pres_med_data[i].duration_no = data.duration_no;

                this.template_pres_med_data[i].frequency = data.frequency;
                this.template_pres_med_data[i].timing = data.timing;
                this.template_pres_med_data[i].generic_name = data.generic_name;
                this.template_pres_med_data[i].quantity = data.quantity;
                this.template_pres_med_data[i].quantitystatus = data.quantitystatus;
                this.template_pres_med_data[i].notes = data.notes;
                // this.template_pres_med_data[i].routeValueName = data.routeNasme
              }
            }
            this.med = {};
          }
          console.log(this.template_pres_med_data);
          var uniqueid = [];
          var uniqueobject = [];
          for (var i = 0; i < this.template_pres_med_data.length; i++) {
            if (uniqueid.indexOf(this.template_pres_med_data[i].item_code) === -1) {
              uniqueid.push(this.template_pres_med_data[i].item_code);
              uniqueobject.push(this.template_pres_med_data[i]);
            }
          }
          this.btn = "Add";
          this.template_pres_med_data = uniqueobject;
          console.log(uniqueobject);
        }
      })
    }
  }


  add_save_favourite_pres(data_fav) {
    console.log(data_fav);
    debugger;
    if (data_fav !== "") {
      for (var i in data_fav) {
        if (data_fav[i].fav) {

          this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_favouritesprescriptionmedicine', data_fav[i]).subscribe(resdata => {
            debugger;
            console.log(resdata);
            if (resdata['IsSuccess']) {
              this.GlobalService.disableloader();
              debugger;
              this.openSnackBar("Saved successfully", "Close");
              this.idarray.push({ "id": resdata['id'] })
              this.template_pres_med_data = resdata['data'];
              this.formdatactr = resdata;
              this.edittemp_pres(this.contenctdata);
              console.log(this.formdatactr);
              this.dialogRef = this.dialog.open(TemplatenamePopupComponent, {
                data: {
                  Id: this.idarray
                },
                disableClose: false
              });
              this.dialogRef.afterClosed().subscribe(() => {
                // unsubscribe onAdd
                this.get_medicine_pres();
              });
            } else {
              this.GlobalService.disableloader();
            }
          })
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Error! there is no favourite selection please select some", "Close");
        }
      }
    } else {
      this.GlobalService.disableloader();
      this.openSnackBar("Please Select Any Medication", "Close");
    }
  }
  add_prescription_normal(data) {
    // add_patient_prescription
    debugger;

    if (this.patientdata_details) {
      for (var i = 0; i < this.patientdata_details.length; i++) {
        for (var j = 0; j < data.length; j++) {
          data[j].uhid_no = this.patientdata_details[i].UHIDNO;
          data[j].encounter_no = this.patientdata_details[i].EncounterNo;
          data[j].diet_advice = data.diet_advice;
          data[j].language = data.language;
          data[j].CB = this.logindata_details[0].User_name;
          data[j].cretaedby = this.logindata_details[0].nr;
        }
      }
    }


    this.GlobalService.enableloader();
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_patient_prescription', data).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Success! Prescription Added Succesfully", "Close");
        debugger;
        this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_patient_prescriptionDiet', data).subscribe(resdata => {
        
          if (resdata['IsSuccess']) {
            this.openSnackBar("Success! Prescription Diet Added Succesfully", "Close");
          } else{
            this.openSnackBar("Error! cant able to add Diet", "Close");
          }
        })
      } else {
        this.GlobalService.disableloader();
        this.openSnackBar("Error! cant able to add", "Close");
      }
    })
  }

  get_patient_prevoius_prescripotion() {
    debugger;
    this.GlobalService.enableloader();
    debugger;
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Managefavourites/getcfav_pres').subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.template_pres_data = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
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


  days = [
    { value: 'steak-0', viewValue: '0' },
    { value: 'steak-0', viewValue: '1' },
    { value: 'pizza-1', viewValue: '2' },
    { value: 'tacos-2', viewValue: '3' },
    { value: 'umm-2', viewValue: '4' }
  ];

  prescr = [
    { value: 'steak-0', viewValue: '24-Hours' },
    { value: 'steak-0', viewValue: '12-Hours' },
    { value: 'pizza-1', viewValue: '8-Hours' },
    { value: 'pizza-1', viewValue: '4-Hours' }
  ]
  timing = [
    { value: 'umm-2', viewValue: 'Before Food' },
    { value: 'steak-0', viewValue: 'After Food' }
  ];
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

  editfunction() {
    debugger;
    this.edit = true;
  }
  savefunction() {
    debugger;
    this.edit = false;
  }
  medicineshortage(): void {
    this.dialogRef = this.dialog.open(PrescriptionshortageComponent, {
      data: {
        width: '800px',
      },

      disableClose: true
    })
  }


  // Get medicine dynamic flow
  get_medicine_kranium_list(data_con) {
    // get_medicinelist
    debugger;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          this.dropdown_hide = true;
          this.medicine_kranium_list = resdata['ResponseObject'];
          console.log(this.medicine_kranium_list);
          if (resdata['ResponseObject'].length == 1) {
            this.med.generic_name = this.medicine_kranium_list[0].genericname;
            this.med.brand_name = this.medicine_kranium_list[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list[0].genericname);
          } else {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
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
    debugger;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list_gen', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          this.medicine_kranium_list = resdata['ResponseObject'];
          console.log(this.medicine_kranium_list);
        }
      })
    }
  }

  GET_similar_medicines(data_con) {
    debugger;
    this.GlobalService.enableloader();
    this.newarray = { "searchdata": data_con.generic_name };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_similarmedicinelist', this.newarray).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        this.medicine_kranium_list_new_test = [];
        var data_med = resdata['ResponseObject'];
        for (var i = 0; i < data_med.length; i++) {
          if (parseInt(data_con.quantity) <= parseInt(data_med[i].quantity)) {
            this.medicine_kranium_list_new_test.push(data_med[i]);
          }
        }
        console.log(this.medicine_kranium_list);
        this.GlobalService.disableloader();
        if (this.medicine_kranium_list_new_test.length != 0) {
          this.dialogRef = this.dialog.open(PrescriptionshortageComponent, {
            data: {
              Id: this.medicine_kranium_list_new_test
            },
            disableClose: true
          })
          this.dialogRef.afterClosed().subscribe((resdata) => {
            // unsubscribe onAdd
            debugger;
            if (resdata.checkbox) {
              console.log(resdata);
              for (var i = 0; i < this.template_pres_med_data.length; i++) {
                if (this.template_pres_med_data[i].item_code == data_con.item_code) {
                  debugger;
                  var new_sss = { "brand_name": resdata.itemname, "generic_name": resdata.genericname, "item_code": resdata.itemcode, "item_name": resdata.itemname, "quantity": resdata.quantity, "frequency": data_con.frequency, "duration_no": data_con.duration_no, "duration_capt": data_con.duration_capt }
                  this.template_pres_med_data.push(new_sss);
                  this.template_pres_med_data.splice(i, 1);
                }
              }

              console.log(this.template_pres_med_data);
            }
          });
        } else {
          this.openSnackBar("There is no required Quantity In Similar Medicine", "Close");
        }


      }
    })

  }

  get_pres(patientdata_details) {
    console.log(patientdata_details);
    var pat_uhid = { uhid: patientdata_details[0].UHIDNO, enc_no: patientdata_details[0].EncounterNo };
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_prescription_patient', pat_uhid).subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.pres_data = resdata['ResponseObject'];
        // this.language = this.pres_data[0].language;
        if(this.pres_data.length > 0){
          this.notes = this.pres_data[0].notes;
          this.dietadvice = this.pres_data[0].diet_advice;
        }
        
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_Diet(patientdata_details){
    this.GlobalService.enableloader();
    debugger;
    var pat_data = { uhid: patientdata_details[0].UHIDNO, enc_no: patientdata_details[0].EncounterNo };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_patient_diet', pat_data).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.pres_diet = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }

    })
    
  }

  get_route(patientdata_details) { 
    this.GlobalService.enableloader();
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Managefavourites/add_patient_route', patientdata_details).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.route_data = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
      sessionStorage.removeItem("previous_prescription");
      if (this.old_prescription) {
        this.prev_pp(this.old_prescription);
      } else {
        sessionStorage.removeItem("previous_prescription");
      }
    })
  }

  get_pres_doct(patientdata_details) {
    this.GlobalService.enableloader();
    debugger;
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Pastencounter/get_prescription_patient_doct', patientdata_details).subscribe(resdata => {
      debugger;
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        debugger;
        this.pres_doct = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }

  get_language() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_language_list').subscribe(resdata => {
      console.log(resdata);
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.language_list = resdata['ResponseObject'];
      } else {
        this.GlobalService.disableloader();
      }
    })
  }


  change_language(getlang) {
    console.log(getlang);
    this.language_mrg = getlang.mrg;
    this.language_aftn = getlang.aftn;
    this.language_eve = getlang.eve;
    this.language_nigt = getlang.nigt;
    this.language_bf = getlang.bf;
    this.language_af = getlang.af;

  }

  clrprocedure() {
    this.med.brand_gen_name = [];
  }

  printPreview() {
    console.log(this.pres_data);
    if (!this.pres_data) {
      this.openSnackBar("No Prescription Found", "Close");
    } else {
      var toPrint = document.getElementById('printSectionId');
      var popupWin = window.open('', '_blank', 'width=800,height=600,location=no,left=200px');
      popupWin.document.open();
      popupWin.document.write('<html><head><style>@page {margin-top: 5cm;margin-bottom: 1cm;margin-left: 2.5cm;margin-right: 1.5cm;} .col-md-12{width:100%;float:left;}.row{width:100%;float:left;}.table th:first-child{display:none;}.table td:first-child{display:none;}.table{border-collapse: collapse;}.table th,.table td{border: 1px solid #ddd;}</style><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></head><body onload="window.print()" style="padding-top:60px;padding-left:40px;">')
      popupWin.document.write(toPrint.innerHTML);
      popupWin.document.write('</body></html>');
      popupWin.document.close();
    }
  }

  genericby_brandname(gen_brand) {
    debugger;
    this.newarray = { "searchdata": gen_brand };
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list_gen', this.newarray).subscribe(resdata => {
      if (resdata['IsSuccess']) {
        debugger;
        this.barand_gen_name = resdata['ResponseObject'];
        console.log(this.barand_gen_name);
      }
    })
  }

  data_click_bind(data_cc) {
    debugger;
    this.med.brand_gen_name = data_cc;
    this.dropdown_hide = false;
    this.get_medicine_kranium_list_forcustomdropdown(data_cc);
  }

  get_medicine_kranium_list_forcustomdropdown(data_con) {
    // get_medicinelist
    debugger;
    if (data_con.length > 3) {
      this.newarray = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/get/Cjmaster/get_medicine_list', this.newarray).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          this.medicine_kranium_list = resdata['ResponseObject'];
          console.log(this.medicine_kranium_list);
          if (resdata['ResponseObject']) {
            this.med.generic_name = this.medicine_kranium_list[0].genericname;
            this.med.brand_name = this.medicine_kranium_list[0].itemname;
            this.genericby_brandname(this.medicine_kranium_list[0].genericname);
          } else {
            this.medicine_kranium_list = resdata['ResponseObject'];
            console.log(this.medicine_kranium_list);
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

  frequencyselection(frequencydata) {
    let i;
    this.freaquencyloop = []
    frequencydata == '24-Hours' ? i=1 : '';
    frequencydata == '12-Hours' ? i=2 : '';
    frequencydata == '8-Hours' ? i=3 : '';
    frequencydata == '4-Hours' ? i=6 : '';
    for(let j=0;j<i;j++){
      let cnt = j+1;
      this.freaquencyloop.push({'model':'dosage'+cnt,'value':''})
    }
  }
}
