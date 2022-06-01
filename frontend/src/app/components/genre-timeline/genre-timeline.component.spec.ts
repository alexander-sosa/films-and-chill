import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreTimelineComponent } from './genre-timeline.component';

describe('GenreTimelineComponent', () => {
  let component: GenreTimelineComponent;
  let fixture: ComponentFixture<GenreTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
