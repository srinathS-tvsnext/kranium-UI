import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationShortcodeComponent } from './investigation-shortcode.component';

describe('InvestigationShortcodeComponent', () => {
  let component: InvestigationShortcodeComponent;
  let fixture: ComponentFixture<InvestigationShortcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationShortcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationShortcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
