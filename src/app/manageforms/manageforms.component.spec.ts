import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageformsComponent } from './manageforms.component';

describe('ManageformsComponent', () => {
  let component: ManageformsComponent;
  let fixture: ComponentFixture<ManageformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
