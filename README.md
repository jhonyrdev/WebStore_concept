# WebStore

**Descripción**: Proyecto de ejemplo que contiene un frontend en Angular (`cliente/`) y un backend Java Spring Boot (`tambito/`).

**Página desplegada**:
- En producción (reemplazar por las reales):
	- Frontend: https://mi-dominio-frontend.com
	- Backend (API): https://api.mi-dominio.com

- En desarrollo (local):
	- Frontend: http://localhost:4200
	- Backend (API): http://localhost:8080

**Instalación**

- Backend (tambito)
	- Requisitos: Java 17+ y Maven
	- Configurar propiedades en `tambito/src/main/resources/application.properties` o crear `application-dev.properties`/`application-prod.properties` con las variables reales (BD, jwt, etc.). Ejemplo mínimo:

		```properties
		spring.datasource.url=jdbc:mysql://HOST:3306/DBNAME
		spring.datasource.username=USER
		spring.datasource.password=PASSWORD
		spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

		jwt.secret=tu_secreto
		jwt.expiration=3600000
		```

	- Ejecutar en desarrollo:

		```bash
		cd tambito
		./mvnw spring-boot:run
		```

- Frontend (cliente)
	- Requisitos: Node.js y pnpm (o npm)
	- Instalar dependencias y ejecutar:

		```bash
		cd cliente
		pnpm install
		pnpm start
		```

**Estructura del proyecto (resumen)**

- `cliente/` — Aplicación Angular (frontend)
	- `src/app/` — módulos, páginas y componentes
	- `public/data/` — JSONs de ejemplo (productos, roles, perfil...)

- `tambito/` — Backend Spring Boot (API)
	- `src/main/java/com/server/tambito` — código fuente Java
	- `src/main/resources` — `application.properties`, migraciones Flyway, etc.

**Stack usado**

- Frontend: Angular, TypeScript, pnpm
- Backend: Java 21+, Spring Boot 4 (Web, Data JPA, Security, Flyway)
- BD: MySQL (con HikariCP)
- Otras: Flyway para migraciones, jjwt para JWT, Cloudinary para almacenamiento de imágenes

**APIs de servicio (resumen)**

Las rutas expuestas están dentro del backend (`tambito`) en los controladores bajo `com.server.tambito`.
Ejemplos de endpoints comunes (revisar controladores para la lista completa):

- Autenticación:
	- `POST /api/auth/login` — iniciar sesión
	- `POST /api/auth/register` — registrar usuario

- Productos / Catálogo:
	- `GET /api/products` — listar productos
	- `GET /api/products/{id}` — detalle de producto
	- `GET /api/categories` — listar categorías

- Carrito y ventas:
	- `POST /api/cart` — agregar al carrito
	- `POST /api/sales` — crear venta

Para documentación completa de cada endpoint, abrir los controladores en `tambito/src/main/java/com/server/tambito/**/controller` o generar Swagger si se integra.

**Notas rápidas**
- Si la aplicación falla al iniciar, revisar `tambito/src/main/resources/application.properties` y reemplazar los placeholders (`{URL_HOSTDB}`, `{TIME_EXPIRATION}`, etc.) por valores reales.
- Para ejecutar con un perfil específico:

	```bash
	# usando mvn
	./mvnw -Dspring-boot.run.profiles=prod spring-boot:run
	# o al ejecutar jar
	java -jar target/tambito-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
	```
