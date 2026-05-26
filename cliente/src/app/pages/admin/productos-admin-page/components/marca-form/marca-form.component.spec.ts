import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaFormComponent } from './marca-form.component';

describe('MarcaFormComponent', () => {
  let component: MarcaFormComponent;
  let fixture: ComponentFixture<MarcaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcaFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
