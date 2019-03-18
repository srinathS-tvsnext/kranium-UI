import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsummaryComponent } from './opsummary.component';

describe('OpsummaryComponent', () => {
  let component: OpsummaryComponent;
  let fixture: ComponentFixture<OpsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
