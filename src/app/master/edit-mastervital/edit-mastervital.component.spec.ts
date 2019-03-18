import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMastervitalComponent } from './edit-mastervital.component';

describe('EditMastervitalComponent', () => {
  let component: EditMastervitalComponent;
  let fixture: ComponentFixture<EditMastervitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMastervitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMastervitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
