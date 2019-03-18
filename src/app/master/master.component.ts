import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  acess_rights;
  constructor() { }

  ngOnInit() {
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
  }

}
