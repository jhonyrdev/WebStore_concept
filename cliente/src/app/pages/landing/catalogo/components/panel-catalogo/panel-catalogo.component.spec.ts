import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCatalogoComponent } from './panel-catalogo.component';

describe('PanelCatalogoComponent', () => {
  let component: PanelCatalogoComponent;
  let fixture: ComponentFixture<PanelCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCatalogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCatalogoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
