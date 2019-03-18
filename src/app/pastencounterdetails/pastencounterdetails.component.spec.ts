import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastencounterdetailsComponent } from './pastencounterdetails.component';

describe('PastencounterdetailsComponent', () => {
  let component: PastencounterdetailsComponent;
  let fixture: ComponentFixture<PastencounterdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastencounterdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastencounterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
