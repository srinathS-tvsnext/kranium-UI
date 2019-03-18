import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmanageformComponent } from './detailmanageform.component';

describe('DetailmanageformComponent', () => {
  let component: DetailmanageformComponent;
  let fixture: ComponentFixture<DetailmanageformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmanageformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmanageformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
