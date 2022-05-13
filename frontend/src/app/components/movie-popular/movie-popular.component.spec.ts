import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePopularComponent } from './movie-popular.component';

describe('MoviePopularComponent', () => {
  let component: MoviePopularComponent;
  let fixture: ComponentFixture<MoviePopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePopularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
