import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageformAddtitleComponent } from './manageform-addtitle.component';

describe('ManageformAddtitleComponent', () => {
  let component: ManageformAddtitleComponent;
  let fixture: ComponentFixture<ManageformAddtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageformAddtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageformAddtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
