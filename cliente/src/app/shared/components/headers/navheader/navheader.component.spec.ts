import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavheaderComponent } from './navheader.component';

describe('NavheaderComponent', () => {
  let component: NavheaderComponent;
  let fixture: ComponentFixture<NavheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavheaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
