import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertService } from '@/app/shared/services/alert.service';
import { ClientAuthService } from '@/app/features/auth/service/client/login/client-auth.service';
import { PurchaseHistoryService } from '@/app/features/sales/services/purchase-history/purchase-history.service';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  const authServiceMock = {
    getSessionProfile: () => null,
    logout: () => undefined,
    username: () => null,
    role: () => 'CLIENTE',
  };

  const alertServiceMock = {
    custom: () => Promise.resolve({} as never),
  };

  const purchaseHistoryServiceMock = {
    loadHistory: () => of([]),
    getByClient: () => [],
    getById: () => null,
    descargarPdf: () => undefined,
  };

  beforeEach(async () => {
    // Al ser un componente Standalone, se importa en lugar de declararse
    await TestBed.configureTestingModule({
      imports: [PerfilComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    
    // Dispara el ciclo de vida de Angular (ngOnInit)
    fixture.detectChanges(); 
  });

  // Test 1: Verifica que el componente logre compilar sin errores
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default profile when session is missing', () => {
    const usuarioActual = component.usuario();
    expect(usuarioActual.nombre).toBe('Cliente');
    expect(usuarioActual.rol).toBe('CLIENTE');
    expect(component.historialPedidos().length).toBe(0);
  });
});
 
