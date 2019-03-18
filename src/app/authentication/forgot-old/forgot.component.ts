import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { GlobalService } from '../../global.service';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  passwordFormControl = new FormControl('', [
    Validators.required
    // Validators.pattern(PASSWD
  ]);
}
