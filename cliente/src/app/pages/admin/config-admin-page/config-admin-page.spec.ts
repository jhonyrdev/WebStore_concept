import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAdminPage } from './config-admin-page';

describe('ConfigAdminPage', () => {
  let component: ConfigAdminPage;
  let fixture: ComponentFixture<ConfigAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigAdminPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
