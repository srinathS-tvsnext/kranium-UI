import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageformTittleComponent } from './manageform-tittle.component';

describe('ManageformTittleComponent', () => {
  let component: ManageformTittleComponent;
  let fixture: ComponentFixture<ManageformTittleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageformTittleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageformTittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
