import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LanguageeditpopupComponent } from '../../master/languageeditpopup/languageeditpopup.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  languages; dialogRef_lang;

  constructor(private http: Http, private GlobalService: GlobalService, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.get_language();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get_language() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_language').subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        this.languages = body.ResponseObject;
        console.log(this.languages);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    });
  }

  edit_row(edit_row) {
    console.log(edit_row);
    this.dialogRef_lang = this.dialog.open(LanguageeditpopupComponent, {
      data: {
        get_detail: edit_row
      },
      disableClose: false
    });
    this.dialogRef_lang.afterClosed().subscribe(() => {
      this.get_language();
    });
  }

}
