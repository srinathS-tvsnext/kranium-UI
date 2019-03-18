import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MexaminationComponent } from './mexamination.component';

describe('MexaminationComponent', () => {
  let component: MexaminationComponent;
  let fixture: ComponentFixture<MexaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MexaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MexaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
