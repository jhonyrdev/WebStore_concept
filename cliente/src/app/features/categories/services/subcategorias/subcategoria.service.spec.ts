import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SubcategoriaService } from './subcategoria.service';

describe('SubcategoriaService', () => {
  let service: SubcategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SubcategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
