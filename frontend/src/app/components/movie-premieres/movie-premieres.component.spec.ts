import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePremieresComponent } from './movie-premieres.component';

describe('MoviePremieresComponent', () => {
  let component: MoviePremieresComponent;
  let fixture: ComponentFixture<MoviePremieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePremieresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviePremieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
