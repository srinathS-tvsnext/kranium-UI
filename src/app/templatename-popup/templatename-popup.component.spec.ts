import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatenamePopupComponent } from './templatename-popup.component';

describe('TemplatenamePopupComponent', () => {
  let component: TemplatenamePopupComponent;
  let fixture: ComponentFixture<TemplatenamePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatenamePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatenamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
