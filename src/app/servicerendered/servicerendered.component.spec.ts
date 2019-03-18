import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerenderedComponent } from './servicerendered.component';

describe('ServicerenderedComponent', () => {
  let component: ServicerenderedComponent;
  let fixture: ComponentFixture<ServicerenderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerenderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerenderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
