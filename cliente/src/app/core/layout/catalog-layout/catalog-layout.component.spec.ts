import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { CatalogLayoutComponent } from './catalog-layout.component';

describe('CatalogLayoutComponent', () => {
  let component: CatalogLayoutComponent;
  let fixture: ComponentFixture<CatalogLayoutComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogLayoutComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogLayoutComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    // atiende TODAS las requests pendientes que matcheen, sin importar cuántas veces se repitan
    httpMock.match('http://localhost:8081/api/public/marcas').forEach(req => req.flush([]));
    httpMock.match('data/subcategorias.json').forEach(req => req.flush([]));
    httpMock.match('http://localhost:8081/api/public/producto').forEach(req => req.flush([]));
    httpMock.match('http://localhost:8081/api/public/categorias').forEach(req => req.flush([]));
    httpMock.match('http://localhost:8081/api/public/subcategorias').forEach(req => req.flush([]));

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});