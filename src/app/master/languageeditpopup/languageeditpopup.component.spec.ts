import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageeditpopupComponent } from './languageeditpopup.component';

describe('LanguageeditpopupComponent', () => {
  let component: LanguageeditpopupComponent;
  let fixture: ComponentFixture<LanguageeditpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageeditpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageeditpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
