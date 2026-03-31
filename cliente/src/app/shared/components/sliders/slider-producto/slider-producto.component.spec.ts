import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderProductoComponent } from './slider-producto.component';

describe('SliderProductoComponent', () => {
  let component: SliderProductoComponent;
  let fixture: ComponentFixture<SliderProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderProductoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
