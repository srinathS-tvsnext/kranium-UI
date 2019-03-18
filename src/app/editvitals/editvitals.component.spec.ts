import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvitalsComponent } from './editvitals.component';

describe('EditvitalsComponent', () => {
  let component: EditvitalsComponent;
  let fixture: ComponentFixture<EditvitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
