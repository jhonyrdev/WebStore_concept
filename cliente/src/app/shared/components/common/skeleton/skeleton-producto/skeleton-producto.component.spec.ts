import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonProductoComponent } from './skeleton-producto.component';

describe('SkeletonProductoComponent', () => {
  let component: SkeletonProductoComponent;
  let fixture: ComponentFixture<SkeletonProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonProductoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
