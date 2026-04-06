import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogLayoutComponent } from './catalog-layout.component';

describe('CatalogLayoutComponent', () => {
  let component: CatalogLayoutComponent;
  let fixture: ComponentFixture<CatalogLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
