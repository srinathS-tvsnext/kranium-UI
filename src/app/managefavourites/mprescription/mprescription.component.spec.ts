import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MprescriptionComponent } from './mprescription.component';

describe('MprescriptionComponent', () => {
  let component: MprescriptionComponent;
  let fixture: ComponentFixture<MprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
