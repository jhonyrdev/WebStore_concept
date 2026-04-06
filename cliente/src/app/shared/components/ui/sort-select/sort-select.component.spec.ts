import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSelectComponent } from './sort-select.component';

describe('SortSelectComponent', () => {
  let component: SortSelectComponent;
  let fixture: ComponentFixture<SortSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
