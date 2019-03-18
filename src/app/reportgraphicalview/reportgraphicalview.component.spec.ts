import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgraphicalviewComponent } from './reportgraphicalview.component';

describe('ReportgraphicalviewComponent', () => {
  let component: ReportgraphicalviewComponent;
  let fixture: ComponentFixture<ReportgraphicalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportgraphicalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportgraphicalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
