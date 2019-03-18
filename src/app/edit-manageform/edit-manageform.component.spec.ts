import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManageformComponent } from './edit-manageform.component';

describe('EditManageformComponent', () => {
  let component: EditManageformComponent;
  let fixture: ComponentFixture<EditManageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
