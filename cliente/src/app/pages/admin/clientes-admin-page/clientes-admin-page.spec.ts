import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAdminPage } from './clientes-admin-page';

describe('ClientesAdminPage', () => {
  let component: ClientesAdminPage;
  let fixture: ComponentFixture<ClientesAdminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesAdminPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesAdminPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
