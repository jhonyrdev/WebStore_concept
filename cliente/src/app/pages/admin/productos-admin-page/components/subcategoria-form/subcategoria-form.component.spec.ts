import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaFormComponent } from './subcategoria-form.component';

describe('SubcategoriaFormComponent', () => {
  let component: SubcategoriaFormComponent;
  let fixture: ComponentFixture<SubcategoriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriaFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
