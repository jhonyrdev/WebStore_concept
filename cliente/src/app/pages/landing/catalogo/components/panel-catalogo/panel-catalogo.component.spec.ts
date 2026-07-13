import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { PanelCatalogoComponent } from './panel-catalogo.component';

describe('PanelCatalogoComponent', () => {
  let component: PanelCatalogoComponent;
  let fixture: ComponentFixture<PanelCatalogoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCatalogoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCatalogoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const reqProducto = httpMock.expectOne('http://localhost:8081/api/public/producto');
    reqProducto.flush([]);

    const reqCategorias = httpMock.expectOne('http://localhost:8081/api/public/categorias');
    reqCategorias.flush([]);

    const reqSubcategorias = httpMock.expectOne('http://localhost:8081/api/public/subcategorias');
    reqSubcategorias.flush([]);

    const reqMarcas = httpMock.expectOne('http://localhost:8081/api/public/marcas');
    reqMarcas.flush([]);

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});