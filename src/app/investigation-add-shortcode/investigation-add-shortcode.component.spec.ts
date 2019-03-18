import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationAddShortcodeComponent } from './investigation-add-shortcode.component';

describe('InvestigationAddShortcodeComponent', () => {
  let component: InvestigationAddShortcodeComponent;
  let fixture: ComponentFixture<InvestigationAddShortcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationAddShortcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationAddShortcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
