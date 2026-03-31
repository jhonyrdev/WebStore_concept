import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCategoriaComponent } from './skeleton-categoria.component';

describe('SkeletonCategoriaComponent', () => {
  let component: SkeletonCategoriaComponent;
  let fixture: ComponentFixture<SkeletonCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCategoriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
