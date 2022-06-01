import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTimelineComponent } from './movie-timeline.component';

describe('MovieTimelineComponent', () => {
  let component: MovieTimelineComponent;
  let fixture: ComponentFixture<MovieTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
