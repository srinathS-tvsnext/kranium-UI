import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBackgroundImgComponent } from './login-background-img.component';

describe('LoginBackgroundImgComponent', () => {
  let component: LoginBackgroundImgComponent;
  let fixture: ComponentFixture<LoginBackgroundImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginBackgroundImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBackgroundImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
