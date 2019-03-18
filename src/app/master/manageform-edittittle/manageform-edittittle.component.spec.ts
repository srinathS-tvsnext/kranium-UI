import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageformEdittittleComponent } from './manageform-edittittle.component';

describe('ManageformEdittittleComponent', () => {
  let component: ManageformEdittittleComponent;
  let fixture: ComponentFixture<ManageformEdittittleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageformEdittittleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageformEdittittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
