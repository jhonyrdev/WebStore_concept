import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisCardComponent } from './statis-card.component';

describe('StatisCardComponent', () => {
  let component: StatisCardComponent;
  let fixture: ComponentFixture<StatisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
