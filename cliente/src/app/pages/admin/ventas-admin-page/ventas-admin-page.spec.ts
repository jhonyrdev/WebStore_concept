import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasAdminPage } from './ventas-admin-page';

describe('VentasAdminPage', () => {
  let component: VentasAdminPage;
  let fixture: ComponentFixture<VentasAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasAdminPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
