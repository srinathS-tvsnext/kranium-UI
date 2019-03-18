import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manageform-addtitle',
  templateUrl: './manageform-addtitle.component.html',
  styleUrls: ['./manageform-addtitle.component.css']
})
export class ManageformAddtitleComponent implements OnInit {

  data;login_details;

  constructor(private http: Http, private GlobalService: GlobalService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.data={};
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  add_tittle(adddata){
    adddata.nr =  this.login_details[0]['nr'];
    this.GlobalService.enableloader();
    this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/add_mform_tittle',adddata).subscribe(resdata => {
      if (resdata) {
        
        debugger;
        var body = JSON.parse(resdata['_body']);
        if(body['IsSuccess']){
          this.GlobalService.disableloader();
          this.openSnackBar("Saved Successfully", "Close");
          this.router.navigate(['/Homescreen/Master/MFTittle']);
        }else {
          debugger;
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error ! Retry", "Close");
        }
      }
      else {
        debugger;
        this.GlobalService.disableloader();
        this.openSnackBar("Some Error ! Retry", "Close");
      }
    })
  }

}
