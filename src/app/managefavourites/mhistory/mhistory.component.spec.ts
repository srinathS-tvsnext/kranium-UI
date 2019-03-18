import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MhistoryComponent } from './mhistory.component';

describe('MhistoryComponent', () => {
  let component: MhistoryComponent;
  let fixture: ComponentFixture<MhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
