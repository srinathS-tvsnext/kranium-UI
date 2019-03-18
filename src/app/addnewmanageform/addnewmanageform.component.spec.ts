import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewmanageformComponent } from './addnewmanageform.component';

describe('AddnewmanageformComponent', () => {
  let component: AddnewmanageformComponent;
  let fixture: ComponentFixture<AddnewmanageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewmanageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewmanageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
