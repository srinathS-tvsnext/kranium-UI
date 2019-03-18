import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationTemplateComponent } from './investigation-template.component';

describe('InvestigationTemplateComponent', () => {
  let component: InvestigationTemplateComponent;
  let fixture: ComponentFixture<InvestigationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
