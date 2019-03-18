import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastencountersComponent } from './pastencounters.component';

describe('PastencountersComponent', () => {
  let component: PastencountersComponent;
  let fixture: ComponentFixture<PastencountersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastencountersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastencountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
