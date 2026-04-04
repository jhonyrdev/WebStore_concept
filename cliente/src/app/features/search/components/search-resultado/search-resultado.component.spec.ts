import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultadoComponent } from './search-resultado.component';

describe('SearchResultadoComponent', () => {
  let component: SearchResultadoComponent;
  let fixture: ComponentFixture<SearchResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
