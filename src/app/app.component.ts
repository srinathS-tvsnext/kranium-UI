import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myData: Array<any>;
  loaderStatus: Boolean = true;
  vitalStatus: Boolean = true;

  constructor(private globalService: GlobalService,private location: Location,private route:Router){
    this.globalService.getLoaderStatus()
      .subscribe(res => this.loaderStatus = res);
      console.log('sts',this.loaderStatus)
  }

  ngOnInit(){
    
   this.globalService.get_access_rights_activity();
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
}
