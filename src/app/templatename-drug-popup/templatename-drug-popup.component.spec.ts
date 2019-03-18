import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatenameDrugPopupComponent } from './templatename-drug-popup.component';

describe('TemplatenameDrugPopupComponent', () => {
  let component: TemplatenameDrugPopupComponent;
  let fixture: ComponentFixture<TemplatenameDrugPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatenameDrugPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatenameDrugPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
