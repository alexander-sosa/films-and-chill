import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAnalyticsComponent } from './movie-analytics.component';

describe('MovieAnalyticsComponent', () => {
  let component: MovieAnalyticsComponent;
  let fixture: ComponentFixture<MovieAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
