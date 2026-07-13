import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isOpen', false);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});