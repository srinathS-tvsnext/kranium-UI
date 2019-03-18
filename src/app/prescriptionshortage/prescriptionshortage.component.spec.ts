import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionshortageComponent } from './prescriptionshortage.component';

describe('PrescriptionshortageComponent', () => {
  let component: PrescriptionshortageComponent;
  let fixture: ComponentFixture<PrescriptionshortageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionshortageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionshortageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
