import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithistoryComponent } from './edithistory.component';

describe('EdithistoryComponent', () => {
  let component: EdithistoryComponent;
  let fixture: ComponentFixture<EdithistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
