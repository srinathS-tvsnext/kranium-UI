import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsumaryTemplateNameComponent } from './opsumary-template-name.component';

describe('OpsumaryTemplateNameComponent', () => {
  let component: OpsumaryTemplateNameComponent;
  let fixture: ComponentFixture<OpsumaryTemplateNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpsumaryTemplateNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsumaryTemplateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
