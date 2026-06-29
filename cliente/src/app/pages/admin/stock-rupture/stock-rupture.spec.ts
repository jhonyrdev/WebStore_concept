import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRupture } from './stock-rupture';

describe('StockRupture', () => {
  let component: StockRupture;
  let fixture: ComponentFixture<StockRupture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockRupture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockRupture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
