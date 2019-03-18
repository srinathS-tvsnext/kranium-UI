import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mdiagnosis',
  templateUrl: './mdiagnosis.component.html',
  styleUrls: ['./mdiagnosis.component.css']
})
export class MdiagnosisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  foods = [
    { value: 'steak-0', viewValue: 'Diagnosis Type 1' },
    { value: 'pizza-1', viewValue: 'Diagnosis Type 2' },
    { value: 'tacos-2', viewValue: 'Diagnosis Type 3' },
    { value: 'umm-2', viewValue: 'Diagnosis Type 4' }
  ];
  
  cats = [
    { value: 'steak-0', viewValue: 'Category 1' },
    { value: 'pizza-1', viewValue: 'Category 2' },
    { value: 'tacos-2', viewValue: 'Category 3' },
    { value: 'umm-2', viewValue: 'Category 4' }
  ];
  
  
}
