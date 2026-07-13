import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { SidebarCatalogComponent } from './sidebar-catalog.component';

describe('SidebarCatalogComponent', () => {
  let component: SidebarCatalogComponent;
  let fixture: ComponentFixture<SidebarCatalogComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCatalogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCatalogComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const reqMarcas = httpMock.expectOne('http://localhost:8081/api/public/marcas');
    reqMarcas.flush([]);

    const reqProducto = httpMock.expectOne('http://localhost:8081/api/public/producto');
    reqProducto.flush([]);

    const reqSubcategorias = httpMock.expectOne('http://localhost:8081/api/public/subcategorias');
    reqSubcategorias.flush([]);

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});