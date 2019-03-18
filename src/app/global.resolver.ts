import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable()
export class GlobalResolver implements Resolve<any> {
  constructor( private GlobalService: GlobalService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.GlobalService.get_access_rights_activity();
  }
}