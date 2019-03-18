import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MreportsComponent } from './mreports.component';

describe('MreportsComponent', () => {
  let component: MreportsComponent;
  let fixture: ComponentFixture<MreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
