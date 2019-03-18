import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrongjobSettingsComponent } from './crongjob-settings.component';

describe('CrongjobSettingsComponent', () => {
  let component: CrongjobSettingsComponent;
  let fixture: ComponentFixture<CrongjobSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrongjobSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrongjobSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
