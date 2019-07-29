import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-background-img',
  templateUrl: './login-background-img.component.html',
  styleUrls: ['./login-background-img.component.css']
})
export class LoginBackgroundImgComponent implements OnInit {
  login_details; chosenfile; image_name; first_image; active_image;
  constructor(private http: Http, private GlobalService: GlobalService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.login_details = JSON.parse(sessionStorage.getItem('logindata'));
    console.log(this.login_details);
    this.get_imagelist();
    this.get_first_image();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  image_upload(event) {
    let fileList: FileList = event;
    if (fileList.length > 0) {
      this.GlobalService.enableloader();
      this.chosenfile = fileList[0];
      let formData: FormData = new FormData();
      formData.append("userfile", this.chosenfile);
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/file_up', formData).subscribe(resdata => {
        if (resdata) {
          var body = JSON.parse(resdata['_body']);
          console.log(body);
          if (body['IsSuccess']) {
            this.get_imagelist();
            this.get_first_image();
            this.openSnackBar("Saved Successfully", "Close");
            this.GlobalService.disableloader();
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Image Not uploaded!", "Close");
          }
        } else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error !", "Close");
        }
      }, err => {
        this.GlobalService.disableloader();
      });
    }
  }

  get_imagelist() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_lg_imagename').subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        this.image_name = body.ResponseObject;
        this.get_auto_check_image();
        console.log(this.image_name);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    });
  }

  get_first_image() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_lg_first_image').subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        this.first_image = body.ResponseObject;
        console.log(this.first_image);
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    });
  }

  get_auto_check_image() {
    this.GlobalService.enableloader();
    this.http.get(this.GlobalService.baseurl + '/api/index.php/v1/get/Masters/get_active_image').subscribe(resdata => {
      if (resdata) {
        var body = JSON.parse(resdata['_body']);
        this.active_image = body.ResponseObject;
        console.log(this.active_image);
        this.active_checkbox();
        this.GlobalService.disableloader();
      }
      else {
        this.GlobalService.disableloader();
      }
    });
  }

  delete_image(image_data) {
    if (confirm("Are you sure to delete this image")) {
      console.log(image_data);
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/login_image_delete', image_data).subscribe(resdata => {
        if (resdata) {
          var body = JSON.parse(resdata['_body']);
          console.log(body);
          if (body['IsSuccess']) {
            this.get_imagelist();
            this.get_first_image();
            this.openSnackBar("Delete Successfully", "Close");
            this.GlobalService.disableloader();
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Some Error !", "Close");
          }
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error !", "Close");
        }
      })
    }
  }

  active_checkbox() {
    var act_img = this.active_image;
    for (var i = 0; i < this.image_name.length; i++) {
      if (this.active_image == undefined) {

      } else {
        for (var j = 0; j < this.active_image.length; j++) {
          if (this.image_name[i].file_name == act_img[j].file_name) {
            this.image_name[i].checkbox = true;
          }
        }
      }
    }
  }


  change_bg(image_data) {
    console.log(image_data.checkbox);
    if ((image_data.checkbox == undefined) || (image_data.checkbox == false)) {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/login_image_add', image_data).subscribe(resdata => {
        if (resdata) {
          var body = JSON.parse(resdata['_body']);
          console.log(body);
          if (body['IsSuccess']) {
            this.openSnackBar("Image Added Successfully", "Close");
            this.GlobalService.disableloader();
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Some Error !", "Close");
          }
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error !", "Close");
        }
      })
    } else if (image_data.checkbox == true) {
      this.GlobalService.enableloader();
      this.http.post(this.GlobalService.baseurl + '/api/index.php/v1/post/Masters/login_image_update', image_data).subscribe(resdata => {
        if (resdata) {
          var body = JSON.parse(resdata['_body']);
          console.log(body);
          if (body['IsSuccess']) {
            this.openSnackBar("Image Removed Successfully", "Close");
            this.GlobalService.disableloader();
          } else {
            this.GlobalService.disableloader();
            this.openSnackBar("Some Error !", "Close");
          }
        }
        else {
          this.GlobalService.disableloader();
          this.openSnackBar("Some Error !", "Close");
        }
      });
    }
  }

}
