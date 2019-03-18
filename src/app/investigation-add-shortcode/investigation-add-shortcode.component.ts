import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-investigation-add-shortcode',
  templateUrl: './investigation-add-shortcode.component.html',
  styleUrls: ['./investigation-add-shortcode.component.css']
})
export class InvestigationAddShortcodeComponent implements OnInit {

  login_details; code; Investigation_menu;
  categorylist_array; hidden; hiddengif; newarraysss; Investigation_category;

  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.code = {};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);

    //search procedure
    this.categorylist_array = [];
    this.hidden = true;
    this.hiddengif = true;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  add_shortcode(categorylist_array, datacode) {
    console.log(datacode);
    console.log(categorylist_array);
    datacode.nr = this.login_details[0]['nr'];

    var data = { "code": datacode, "long_desc": categorylist_array };

    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Investigation/add_shortcode', data).subscribe(resdata => {
      debugger;
      if (resdata['IsSuccess']) {
        this.GlobalService.disableloader();
        this.openSnackBar("Save Successfully", "Close");
        this.router.navigate(['/Homescreen/Master/Shortcode']);
      }
      else {
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error! Retry", "Close");
      }

    })

  }


  //procedure search
  get_medicine_kranium_list_gen(data_con) {
    debugger;
    this.hiddengif = false;
    if (data_con.length > 2) {
      // this.GlobalService.enableloader();
      this.newarraysss = { "searchdata": data_con };
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Investigation/get_all_investigation_list_search', this.newarraysss).subscribe(resdata => {
        if (resdata['IsSuccess']) {
          debugger;
          this.Investigation_category = resdata['ResponseObject'];
          this.hidden = false;
          this.hiddengif = true;
          // this.GlobalService.disableloader();
          //searchbox style class add
          var invlist = this.Investigation_category;
          if(invlist.length < 10){
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.add("myboxsize");
          }else{
            var myboxclass = document.getElementById("mysearchbox").classList;
            myboxclass.remove("myboxsize");
          }
          //end of searchbox style class
        } else {
          this.hiddengif = false;
          // this.GlobalService.disableloader();
        }
      })
    }
  }
  //End of procedure search
  cleardata() {
    this.Investigation_menu = [];
    this.hiddengif = true;
    this.hidden = true;
  }
  create_category_list(vreate_categorylist) {
    debugger;
    if (vreate_categorylist.checkbox) {
      this.Investigation_menu = vreate_categorylist.item_long_description;
      // this.categorylist_array.push(vreate_categorylist);
      this.categorylist_array = vreate_categorylist;
      
      for (var i = 0; i < this.Investigation_category.length; i++) {
        debugger;
        if (this.Investigation_category[i].item_code == vreate_categorylist.item_code) {
          this.Investigation_category[i].checkbox = true;
        } else {
          this.Investigation_category[i].checkbox = false;
        }
      }
      console.log(this.categorylist_array);
    }
  }


  remove_temp(rem_cat) {
    debugger;
    console.log(rem_cat);
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


}
