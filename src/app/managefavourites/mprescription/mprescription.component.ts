import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mprescription',
  templateUrl: './mprescription.component.html',
  styleUrls: ['./mprescription.component.css']
})
export class MprescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  favs = [
    { value: 'steak-0', viewValue: 'Favourite Type 1' },
    { value: 'pizza-1', viewValue: 'Favourite Type 2' },
    { value: 'tacos-2', viewValue: 'Favourite Type 3' },
    { value: 'umm-2', viewValue: 'Favourite Type 4' }
  ];
  favdrgs = [
    { value: 'steak-0', viewValue: 'Drug 1' },
    { value: 'pizza-1', viewValue: 'Drug Type 2' },
    { value: 'tacos-2', viewValue: 'Drug Type 3' },
    { value: 'umm-2', viewValue: 'Drug Type 4' }
  ];
  langs = [
    { value: 'steak-0', viewValue: 'English' },
    { value: 'pizza-1', viewValue: 'Hindi' },
    { value: 'tacos-2', viewValue: 'Tamil' }
  ];

  days = [
    { value: 'steak-0', viewValue: '0' },
    { value: 'steak-0', viewValue: '1' },
    { value: 'pizza-1', viewValue: '2' },
    { value: 'tacos-2', viewValue: '3' },
    { value: 'umm-2', viewValue: '4' }
  ];

  meds = [
    { value: 'steak-0', viewValue: 'AF' },
    { value: 'pizza-1', viewValue: 'BF' }
  ];
}
