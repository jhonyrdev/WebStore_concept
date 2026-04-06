import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCatalogComponent } from './sidebar-catalog.component';

describe('SidebarCatalogComponent', () => {
  let component: SidebarCatalogComponent;
  let fixture: ComponentFixture<SidebarCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCatalogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
