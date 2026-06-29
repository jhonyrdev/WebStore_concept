import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagoFormComponent } from './metodo-pago-form.component';

describe('MetodoPagoFormComponent', () => {
  let component: MetodoPagoFormComponent;
  let fixture: ComponentFixture<MetodoPagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoPagoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoPagoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
