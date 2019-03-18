import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterchangepasswordComponent } from './masterchangepassword.component';

describe('MasterchangepasswordComponent', () => {
  let component: MasterchangepasswordComponent;
  let fixture: ComponentFixture<MasterchangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterchangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
