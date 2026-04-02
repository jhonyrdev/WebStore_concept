# Guía de Arquitectura - WebStore Concept

Esta guía documenta la estructura de carpetas del proyecto Angular y sus propósitos.

---

## 📁 Core

### ¿Qué es?
El módulo `Core` contiene la lógica fundamental y servicios reutilizables de la aplicación. Es el centro neurálgico donde se definen configuraciones globales, interceptores, guardias de rutas y layouts principales.

### Estructura:
```
core/
├── components/          # Componentes base o globales
├── config/              # Configuraciones generales de la app
├── guards/              # Guardias de rutas (protección de acceso)
├── interceptor/         # Interceptores HTTP
├── layout/              # Layouts principales de la aplicación
│   ├── admin-layout/    # Layout para sección administrativa
│   ├── public-layout/   # Layout para sección pública
│   └── user-layout/     # Layout para usuarios registrados
└── services/            # Servicios globales
    └── api/             # Servicio de comunicación con backend
```

### Responsabilidades:
- **Guards**: Controlar acceso a rutas (autenticación, autorización)
- **Interceptor**: Manejo global de peticiones HTTP (tokens, errores)
- **Layout**: Esctructura base de diferentes secciones (header, footer, navbar)
- **Services**: Conexión con API backend
- **Config**: Configuraciones centralizadas de la app

---

## 🎯 Features

### ¿Qué es?
`Features` contiene módulos específicos de funcionalidades del negocio. Cada feature es independiente y representa una característica o dominio de la aplicación.

### Estructura:
```
features/
├── categories/          # Gestión de categorías
│   ├── components/      # Componentes de categorías
│   │   ├── category-section/
│   │   └── sidebar-categoria/
│   ├── models/          # Modelos de datos (interfaces)
│   │   └── category.model.ts
│   └── services/        # Servicios de categorías
│       └── categoria.service.ts
│
├── product/             # Gestión de productos
│   ├── components/      # Componentes de productos
│   │   └── product-section/
│   ├── models/          # Modelos de datos
│   │   └── product.model.ts
│   └── services/        # Servicios de productos
│       └── producto.service.ts
│
└── search/              # Búsqueda de productos
    ├── components/
    ├── models/
    └── services/
```

### Responsabilidades:
- **Components**: UI específica de cada feature
- **Models**: Interfaces y tipos de datos (TypeScript)
- **Services**: Lógica de negocio y comunicación con API

### Principios:
- Cada feature es modular e independiente
- Contiene toda la lógica relacionada a esa funcionalidad
- Facilita el mantenimiento y escalabilidad

---

## 📄 Pages

### ¿Qué es?
`Pages` contiene componentes que representan páginas completas de la aplicación. Cada página es una vista que el usuario ve al navegar.

### Estructura:
```
pages/
├── admin/               # Páginas administrativas
│   └── adminPages.txt
│
├── client/              # Páginas para clientes/usuarios
│   └── userPages.txt
│
├── errors_page/         # Páginas de error
│   └── page-notfound/   # Página 404 (no encontrada)
│       ├── page-notfound.component.ts
│       ├── page-notfound.component.html
│       ├── page-notfound.component.css
│       └── page-notfound.component.spec.ts
│
└── landing/             # Página de inicio y secciones públicas
    ├── catalogo/        # Catálogo de productos
    └── home/            # Página principal
```

### Responsabilidades:
- Representar vistas completas
- Orquestar múltiples componentes
- Conectar features y servicios
- Manejar la lógica de flujo de la página

### Diferencia con Components:
- **Pages**: Componentes de nivel superior que representan rutas completas
- **Components**: Elementos reutilizables dentro de páginas

---

## 🔧 Shared

### ¿Qué es?
`Shared` es un repositorio de código útil y reutilizable en toda la aplicación. Contiene componentes comunes, utilidades, constantes y pipes que se usan en múltiples lugares.

### Estructura:
```
shared/
├── components/          # Componentes reutilizables
│   ├── common/          # Componentes genéricos (botones, tarjetas, etc.)
│   ├── layout/          # Componentes de maquetación
│   └── ui/              # Componentes de interfaz de usuario
│
├── constants/           # Constantes de la aplicación
│   └── categoria.config.ts
│
├── pipes/               # Pipes personalizados
│   └── pipes.txt
│
└── utils/               # Funciones de utilidad
    └── utils.txt
```

### Responsabilidades:
- **Components**: Elementos UI reutilizables (navbar, footer, botones, etc.)
- **Constants**: Valores constantes (configuraciones, mensajes)
- **Pipes**: Transformadores de datos (formato de moneda, fechas, etc.)
- **Utils**: Funciones auxiliares de uso general

### Principios:
- Código independiente de features
- Reutilizable en toda la aplicación
- Material de construcción base para otras partes

---

## 🗂️ Resumen Visual

```
app/
├── core/              ← Configuración global, servicios, layouts
│
├── features/          ← Dominios de negocio (categorías, productos, búsqueda)
│
├── pages/             ← Páginas completas (home, catalogo, admin)
│
└── shared/            ← Componentes y utilidades reutilizables
```

---

## 📊 Flujo típico de la arquitectura

1. **Usuario navega** → Activa una ruta en `pages/`
2. **Page Component** → Usa componentes de `features/` y `shared/`
3. **Features** → Llama servicios de su propia feature
4. **Services** → Usa `core/services/api` para comunicarse con backend
5. **Core Guards/Interceptors** → Validan y procesan la comunicación

---

## 💡 Buenas Prácticas

✅ **Haz:**
- Mantener cada feature independiente
- Usar servicios compartidos via inyección de dependencias
- Importar utilidades de `shared/`
- Usar guardias para proteger rutas

❌ **Evita:**
- Importaciones cruzadas entre features
- Lógica de negocios en componentes
- Duplicar código de `shared/`
- Acceder directamente a APIs sin usar servicios
