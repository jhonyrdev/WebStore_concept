import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CatalogoComponent } from './catalogo.component';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});