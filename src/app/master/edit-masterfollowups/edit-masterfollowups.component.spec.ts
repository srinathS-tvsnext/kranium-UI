import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterfollowupsComponent } from './edit-masterfollowups.component';

describe('EditMasterfollowupsComponent', () => {
  let component: EditMasterfollowupsComponent;
  let fixture: ComponentFixture<EditMasterfollowupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterfollowupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterfollowupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
