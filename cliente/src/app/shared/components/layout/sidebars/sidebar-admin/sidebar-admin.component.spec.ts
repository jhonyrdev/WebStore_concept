import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SidebarAdminComponent } from './sidebar-admin.component';

describe('SidebarAdminComponent', () => {
  let component: SidebarAdminComponent;
  let fixture: ComponentFixture<SidebarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAdminComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAdminComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});