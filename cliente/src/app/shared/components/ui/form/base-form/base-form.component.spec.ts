import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';              // ← import nuevo

import { BaseFormComponent } from './base-form.component';

describe('BaseFormComponent', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('form', new FormGroup({}));  

    fixture.detectChanges();                                   
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});