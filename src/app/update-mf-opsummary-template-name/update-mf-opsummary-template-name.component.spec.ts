import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMfOpsummaryTemplateNameComponent } from './update-mf-opsummary-template-name.component';

describe('UpdateMfOpsummaryTemplateNameComponent', () => {
  let component: UpdateMfOpsummaryTemplateNameComponent;
  let fixture: ComponentFixture<UpdateMfOpsummaryTemplateNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMfOpsummaryTemplateNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMfOpsummaryTemplateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
