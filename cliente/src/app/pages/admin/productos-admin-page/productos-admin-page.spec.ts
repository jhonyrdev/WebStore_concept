import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductosAdminPage } from './productos-admin-page';

describe('ProductosAdminPage', () => {
  let component: ProductosAdminPage;
  let fixture: ComponentFixture<ProductosAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosAdminPage],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAdminPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});