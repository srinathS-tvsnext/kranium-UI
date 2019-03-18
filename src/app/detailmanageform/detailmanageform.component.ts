import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-detailmanageform',
  templateUrl: './detailmanageform.component.html',
  styleUrls: ['./detailmanageform.component.css']
})
export class DetailmanageformComponent implements OnInit {
  page; sub; id; arrayss; formdatacr; array;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private GlobalService: GlobalService) { }

  ngOnInit() {
    this.viewfor();
  }


  viewfor() {
    this.sub = this.route.snapshot.params['id']
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
      }
      // routerLink='/Homescreen/Patientlist'
    })
  }
  edit_for(data_edit) {
    debugger;
    this.router.navigate(['/Homescreen/Editform', data_edit]);
  }
}
