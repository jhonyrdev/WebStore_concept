import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCategoriasComponent } from './slider-categorias.component';

describe('SliderCategoriasComponent', () => {
  let component: SliderCategoriasComponent;
  let fixture: ComponentFixture<SliderCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCategoriasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
