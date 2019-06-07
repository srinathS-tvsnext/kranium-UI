import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  apiSecretKey = 'JAGO_1234';
  timestamp = this.getMicrotime(true).toString();
  getHMAC(users, key, timestamp) {
    var hash = CryptoJS.HmacSHA256(users + key + timestamp, this.apiSecretKey);
    return hash.toString();
  };
  loginHMAC(data, timestamp) {
    var hash = CryptoJS.HmacSHA256(timestamp, this.apiSecretKey);
    return hash.toString();
  };
  getMicrotime(get_as_float) {

    var now = new Date().getTime() / 1000;
    var s = parseInt(now.toString(), 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
  };
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
    var timestamp = this.getMicrotime(true).toString();
    var reqcloned = req.clone({
      setHeaders: {
        'microtime': timestamp,
        'hash': this.loginHMAC(JSON.stringify(req.body), timestamp)
      }
    });
    return next.handle(reqcloned).do(evt => {
      if (evt instanceof HttpResponse) {
        console.log('---> response', evt);
      }
    });

  }
}