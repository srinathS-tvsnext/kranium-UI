import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mfollowups',
  templateUrl: './mfollowups.component.html',
  styleUrls: ['./mfollowups.component.css']
})
export class MfollowupsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  slots = [
    { value: 'steak-0', viewValue: 'Slot 1' },
    { value: 'pizza-1', viewValue: 'Slot 2' },
    { value: 'tacos-2', viewValue: 'Slot 3' },
    { value: 'umm-2', viewValue: 'Slot 4' }
  ];
  docs = [
    { value: 'steak-0', viewValue: 'Doctor 1' },
    { value: 'pizza-1', viewValue: 'Doctor 2' },
    { value: 'tacos-2', viewValue: 'Doctor 3' },
    { value: 'umm-2', viewValue: 'Doctor 4' }
  ];
  depts = [
    { value: 'steak-0', viewValue: 'Department 1' },
    { value: 'pizza-1', viewValue: 'Department 2' },
    { value: 'tacos-2', viewValue: 'Department 3' },
    { value: 'umm-2', viewValue: 'Department 4' }
  ];
}
