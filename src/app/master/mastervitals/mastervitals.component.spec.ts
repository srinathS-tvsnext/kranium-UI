import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastervitalsComponent } from './mastervitals.component';

describe('MastervitalsComponent', () => {
  let component: MastervitalsComponent;
  let fixture: ComponentFixture<MastervitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastervitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastervitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
