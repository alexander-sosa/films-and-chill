import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreListingComponent } from './genre-listing.component';

describe('GenreListingComponent', () => {
  let component: GenreListingComponent;
  let fixture: ComponentFixture<GenreListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
