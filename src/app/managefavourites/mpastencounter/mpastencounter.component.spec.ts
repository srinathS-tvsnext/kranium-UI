import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpastencounterComponent } from './mpastencounter.component';

describe('MpastencounterComponent', () => {
  let component: MpastencounterComponent;
  let fixture: ComponentFixture<MpastencounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpastencounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpastencounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
