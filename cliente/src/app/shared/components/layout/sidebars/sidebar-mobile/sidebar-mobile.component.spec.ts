import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarMobileComponent } from './sidebar-mobile.component';

describe('SidebarMobileComponent', () => {
  let component: SidebarMobileComponent;
  let fixture: ComponentFixture<SidebarMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMobileComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isOpen', false);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});