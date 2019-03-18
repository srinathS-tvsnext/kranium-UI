import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientlistComponent } from './inpatientlist.component';

describe('InpatientlistComponent', () => {
  let component: InpatientlistComponent;
  let fixture: ComponentFixture<InpatientlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpatientlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
