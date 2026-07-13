import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminFooterComponent } from './admin-footer.component';

describe('AdminFooterComponent', () => {
  let component: AdminFooterComponent;
  let fixture: ComponentFixture<AdminFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFooterComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFooterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});