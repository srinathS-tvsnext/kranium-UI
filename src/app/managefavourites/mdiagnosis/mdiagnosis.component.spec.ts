import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdiagnosisComponent } from './mdiagnosis.component';

describe('MdiagnosisComponent', () => {
  let component: MdiagnosisComponent;
  let fixture: ComponentFixture<MdiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
