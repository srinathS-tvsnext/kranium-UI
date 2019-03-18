import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinvestigationComponent } from './minvestigation.component';

describe('MinvestigationComponent', () => {
  let component: MinvestigationComponent;
  let fixture: ComponentFixture<MinvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
