import { Component,Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-languageeditpopup',
  templateUrl: './languageeditpopup.component.html',
  styleUrls: ['./languageeditpopup.component.css']
})
export class LanguageeditpopupComponent implements OnInit {
  data;login_details;
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService, public snackBar: MatSnackBar,public dialogRef: MatDialogRef<LanguageeditpopupComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public languagedetail: any) { }

  ngOnInit() {
    this.data={};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));

    console.log(this.languagedetail);
    this.get_lang_det();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  editlang(langdata){
    console.log(langdata);
    if((langdata.morning && langdata.afternoon && langdata.evening && langdata.night && langdata.bf && langdata.af) == ""){
      this.openSnackBar("Please Enter All Fields", "Close");
    }else{
      langdata.lang_id = this.languagedetail.get_detail.language_id;
      langdata.nr =  this.login_details[0]['nr'];
      console.log(langdata);
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/edit_language_items',langdata).subscribe(resdata =>{
        if(resdata['IsSuccess']){
          this.GlobalService.disableloader();
          this.dialogRef.close();
          this.openSnackBar("Updated Successfully", "Close");
        }else{
          this.dialogRef.close();
          this.GlobalService.disableloader();
          this.openSnackBar("Error ! Retry", "Close");
        }
      })
    }
  }

  cancellang(){
    this.dialogRef.close();
  }

  get_lang_det(){    
    var mrg = this.languagedetail.get_detail.mrg;
    var aftn = this.languagedetail.get_detail.aftn;
    var eve = this.languagedetail.get_detail.eve;
    var nigt = this.languagedetail.get_detail.nigt;
    var bf = this.languagedetail.get_detail.bf;
    var af = this.languagedetail.get_detail.af;

    this.data.morning = mrg;
    this.data.afternoon = aftn; 
    this.data.evening = eve;  
    this.data.night = nigt; 
    this.data.bf = bf; 
    this.data.af = af; 

  }

}
