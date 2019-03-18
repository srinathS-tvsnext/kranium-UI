import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfollowupsComponent } from './mfollowups.component';

describe('MfollowupsComponent', () => {
  let component: MfollowupsComponent;
  let fixture: ComponentFixture<MfollowupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfollowupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
