import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseProfileComponent } from './use-profile.component';

describe('UseProfileComponent', () => {
  let component: UseProfileComponent;
  let fixture: ComponentFixture<UseProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
