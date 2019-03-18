import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private GlobalService: GlobalService) { }
  acess_rights;

  ngOnInit() {
    
    // this.acess_rights = this.GlobalService.user_access_rights;
    this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
  }



}
