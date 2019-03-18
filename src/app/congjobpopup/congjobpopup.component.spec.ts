import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongjobpopupComponent } from './congjobpopup.component';

describe('CongjobpopupComponent', () => {
  let component: CongjobpopupComponent;
  let fixture: ComponentFixture<CongjobpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongjobpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongjobpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
