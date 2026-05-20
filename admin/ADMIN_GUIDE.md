# Admin Panel - WebStore

Panel administrativo completo para gestión de tienda con Angular 20.

## 🚀 Características

- **Dashboard**: Resumen ejecutivo con gráficos de ventas y productos más vendidos
- **Gestión de Productos**: Tabla interactiva con búsqueda y filtros
- **Gestión de Clientes**: Registro y monitoreo de clientes
- **Sidebar Navigation**: Menú lateral con navegación intuitiva
- **Diseño Responsivo**: Interfaz moderna y adaptable

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   └── layout/
│       ├── admin-layout.component.*
│       └── sidebar/
│           └── sidebar.component.*
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── dashboard-stats/
│   │   │   ├── sales-chart/
│   │   │   └── top-products/
│   │   └── dashboard.component.*
│   ├── productos/
│   │   ├── models/
│   │   ├── services/
│   │   └── productos.component.*
│   └── clientes/
│       ├── models/
│       ├── services/
│       └── clientes.component.*
└── shared/
    └── (componentes reutilizables)
```

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar servidor de desarrollo:
```bash
npm start
```

3. Abrir navegador en:
```
http://localhost:4200
```

## 📊 Componentes Principales

### Dashboard
- **Stats Cards**: Mostrar métricas clave (ventas diarias, productos más vendidos)
- **Sales Chart**: Gráfico de líneas/barras con ventas por día
- **Top Products**: Lista de productos más vendidos con barras de progreso

### Productos
- Tabla con búsqueda y filtro por categoría
- Botón para agregar nuevos productos
- Acciones: Editar y Eliminar
- Estados: Disponible/Agotado

### Clientes
- Tabla de clientes con información completa
- Búsqueda y filtro por estado
- Botón para agregar nuevos clientes
- Opción de exportar datos

## 🎨 Colores y Estilos

- **Primario**: #8b2d7e (Púrpura)
- **Secundario**: #ffc107 (Amarillo)
- **Success**: #28a745 (Verde)
- **Danger**: #dc3545 (Rojo)

## 📱 Rutas

- `/admin/dashboard` - Dashboard principal
- `/admin/productos` - Gestión de productos
- `/admin/clientes` - Gestión de clientes

## 🔄 Servicios

- **ProductoService**: Gestión de productos (CRUD)
- **ClienteService**: Gestión de clientes (CRUD)

## 💡 Próximas Mejoras

- [ ] Integración con API real
- [ ] Autenticación y autorización
- [ ] Reportes más avanzados
- [ ] Exportación a PDF/Excel
- [ ] Gráficos más complejos con Chart.js
- [ ] Sistema de notificaciones
- [ ] Modo oscuro

## 📝 Licencia

MIT
