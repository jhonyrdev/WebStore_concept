import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCategoriaComponent } from './sidebar-categoria.component';

describe('SidebarCategoriaComponent', () => {
  let component: SidebarCategoriaComponent;
  let fixture: ComponentFixture<SidebarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCategoriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
