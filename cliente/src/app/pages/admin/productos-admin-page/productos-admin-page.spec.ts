import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdminPage } from './productos-admin-page';

describe('ProductosAdminPage', () => {
  let component: ProductosAdminPage;
  let fixture: ComponentFixture<ProductosAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAdminPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
