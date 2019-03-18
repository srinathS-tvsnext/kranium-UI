import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterolesEditComponent } from './createroles-edit.component';

describe('CreaterolesEditComponent', () => {
  let component: CreaterolesEditComponent;
  let fixture: ComponentFixture<CreaterolesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaterolesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaterolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
