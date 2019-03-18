import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvitalsComponent } from './mvitals.component';

describe('MvitalsComponent', () => {
  let component: MvitalsComponent;
  let fixture: ComponentFixture<MvitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
