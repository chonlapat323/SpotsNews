import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSlider } from './news-slider';

describe('NewsSlider', () => {
  let component: NewsSlider;
  let fixture: ComponentFixture<NewsSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
