import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousprescriptionComponent } from './previousprescription.component';

describe('PreviousprescriptionComponent', () => {
  let component: PreviousprescriptionComponent;
  let fixture: ComponentFixture<PreviousprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
