import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAnalyticsComponent } from './genre-analytics.component';

describe('GenreAnalyticsComponent', () => {
  let component: GenreAnalyticsComponent;
  let fixture: ComponentFixture<GenreAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
