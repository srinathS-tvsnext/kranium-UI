import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefavouritesComponent } from './managefavourites.component';

describe('ManagefavouritesComponent', () => {
  let component: ManagefavouritesComponent;
  let fixture: ComponentFixture<ManagefavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagefavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
