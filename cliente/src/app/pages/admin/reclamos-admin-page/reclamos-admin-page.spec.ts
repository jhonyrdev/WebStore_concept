import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosAdminPage } from './reclamos-admin-page';

describe('ReclamosAdminPage', () => {
  let component: ReclamosAdminPage;
  let fixture: ComponentFixture<ReclamosAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamosAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamosAdminPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
