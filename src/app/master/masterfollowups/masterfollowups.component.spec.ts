import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterfollowupsComponent } from './masterfollowups.component';

describe('MasterfollowupsComponent', () => {
  let component: MasterfollowupsComponent;
  let fixture: ComponentFixture<MasterfollowupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterfollowupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterfollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
