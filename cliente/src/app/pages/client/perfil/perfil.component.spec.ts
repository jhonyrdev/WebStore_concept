import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

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

  // Test 2: Verifica que el Signal del usuario tenga los datos iniciales
  it('debería cargar los datos del usuario por defecto', () => {
    const usuarioActual = component.usuario();
    expect(usuarioActual.nombre).toBe('Franco Javier');
    expect(usuarioActual.rol).toBe('CLIENTE');
  });

  // Test 3: Verifica que el historial de compras inicie con los 4 pedidos mockeados
  it('debería inicializar el historial con 4 pedidos', () => {
    expect(component.historialPedidos().length).toBe(4);
  });
});