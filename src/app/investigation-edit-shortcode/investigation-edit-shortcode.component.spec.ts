import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationEditShortcodeComponent } from './investigation-edit-shortcode.component';

describe('InvestigationEditShortcodeComponent', () => {
  let component: InvestigationEditShortcodeComponent;
  let fixture: ComponentFixture<InvestigationEditShortcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationEditShortcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationEditShortcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
