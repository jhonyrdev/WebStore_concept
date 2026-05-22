CREATE TABLE credencial (
  id_cred INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(45) NOT NULL,
  clave VARCHAR(100) NOT NULL,
  rol ENUM('admin','cliente') NOT NULL,
  tipo_login ENUM('LOCAL','GOOGLE','MICROSOFT') NOT NULL,
  PRIMARY KEY (id_cred),
  UNIQUE (usuario)
);

CREATE TABLE administrador (
  id_admin INT NOT NULL AUTO_INCREMENT,
  nom_admin VARCHAR(45) NOT NULL,
  correo_admin VARCHAR(45) NOT NULL,
  id_cred INT NOT NULL,
  PRIMARY KEY (id_admin),
  UNIQUE (correo_admin),
  FOREIGN KEY (id_cred) REFERENCES credencial(id_cred)
);

CREATE TABLE cliente (
  id_cli INT NOT NULL AUTO_INCREMENT,
  cod_cli VARCHAR(20) NOT NULL,
  nom_cli VARCHAR(45) NOT NULL,
  ape_cli VARCHAR(45) NOT NULL,
  correo_cli VARCHAR(45) NOT NULL,
  tel_cli VARCHAR(20),
  estado ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
  fecha_reg DATE NOT NULL,
  id_cred INT,
  PRIMARY KEY (id_cli),
  UNIQUE (cod_cli),
  UNIQUE (correo_cli),
  FOREIGN KEY (id_cred) REFERENCES credencial(id_cred)
);

CREATE TABLE direccion (
  id_dir INT NOT NULL AUTO_INCREMENT,
  id_cli INT NOT NULL,
  direccion TEXT NOT NULL,
  tipo ENUM('casa','oficina','otro') NOT NULL DEFAULT 'casa',
  PRIMARY KEY (id_dir),
  FOREIGN KEY (id_cli) REFERENCES cliente(id_cli)
);

CREATE TABLE categoria (
  id_cat INT NOT NULL AUTO_INCREMENT,
  nom_cat VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_cat),
  UNIQUE (nom_cat)
);

CREATE TABLE subcategoria (
  id_subcat INT NOT NULL AUTO_INCREMENT,
  nom_subcat VARCHAR(45) NOT NULL,
  id_cat INT NOT NULL,
  PRIMARY KEY (id_subcat),
  FOREIGN KEY (id_cat) REFERENCES categoria(id_cat)
);

CREATE TABLE marca (
  id_marca INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE unidad (
  id_unidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE producto (
  id_prod INT NOT NULL AUTO_INCREMENT,
  cod_prod VARCHAR(10) NOT NULL,
  nom_prod VARCHAR(45) NOT NULL,
  des_prod VARCHAR(100),
  id_marca INT,
  id_unidad INT,
  cant_prod INT NOT NULL DEFAULT 0,
  precio_prod DECIMAL(10,2) NOT NULL,
  img_prod VARCHAR(255),
  estado ENUM('agotado','critico','disponible','inactivo') NOT NULL,
  id_subcat INT NOT NULL,
  PRIMARY KEY (id_prod),
  UNIQUE (cod_prod),
  FOREIGN KEY (id_marca) REFERENCES marca(id_marca),
  FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad),
  FOREIGN KEY (id_subcat) REFERENCES subcategoria(id_subcat)
);

CREATE TABLE pedido (
  id_ped INT NOT NULL AUTO_INCREMENT,
  id_cli INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  tipo_entrega ENUM('envio','recojo') NOT NULL,
  estado ENUM('nuevo','realizado','rechazado') NOT NULL DEFAULT 'Nuevo',
  id_dir INT,
  total DECIMAL(38,2) NOT NULL,
  PRIMARY KEY (id_ped),
  FOREIGN KEY (id_cli) REFERENCES cliente(id_cli),
  FOREIGN KEY (id_dir) REFERENCES direccion(id_dir)
);

CREATE TABLE detalle_pedido (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  id_ped INT NOT NULL,
  id_prod INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unit DECIMAL(38,2) NOT NULL,
  subtotal DECIMAL(38,2) NOT NULL,
  PRIMARY KEY (id_detalle),
  FOREIGN KEY (id_ped) REFERENCES pedido(id_ped),
  FOREIGN KEY (id_prod) REFERENCES producto(id_prod)
);

CREATE TABLE metodo_pago (
  id_metodo INT NOT NULL AUTO_INCREMENT,
  nombre_metodo VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_metodo),
  UNIQUE (nombre_metodo)
);

CREATE TABLE venta (
  id_venta INT NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  id_cli INT NOT NULL,
  id_ped INT,
  id_metodo INT NOT NULL,
  total DECIMAL(38,2) NOT NULL,
  tipo ENUM('boleta','factura') NOT NULL,
  PRIMARY KEY (id_venta),
  FOREIGN KEY (id_cli) REFERENCES cliente(id_cli),
  FOREIGN KEY (id_ped) REFERENCES pedido(id_ped),
  FOREIGN KEY (id_metodo) REFERENCES metodo_pago(id_metodo)
);

CREATE TABLE detalle_venta (
  id_detalle INT NOT NULL AUTO_INCREMENT,
  id_venta INT NOT NULL,
  id_prod INT NOT NULL,
  nom_prod VARCHAR(100) NOT NULL,
  cantidad INT NOT NULL,
  precio_unit DECIMAL(38,2) NOT NULL,
  subtotal DECIMAL(38,2) NOT NULL,
  PRIMARY KEY (id_detalle),
  FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
  FOREIGN KEY (id_prod) REFERENCES producto(id_prod)
);

CREATE TABLE boleta (
  id_venta INT NOT NULL,
  codigo_boleta VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_venta),
  UNIQUE (codigo_boleta),
  FOREIGN KEY (id_venta) REFERENCES venta(id_venta)
);

CREATE TABLE factura (
  id_venta INT NOT NULL,
  codigo_factura VARCHAR(20) NOT NULL,
  ruc_cliente VARCHAR(11),
  razon_social_cliente VARCHAR(100),
  PRIMARY KEY (id_venta),
  UNIQUE (codigo_factura),
  FOREIGN KEY (id_venta) REFERENCES venta(id_venta)
);

CREATE TABLE historial (
  id_mov INT NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  id_admin INT NOT NULL,
  PRIMARY KEY (id_mov),
  FOREIGN KEY (id_admin) REFERENCES administrador(id_admin)
);

CREATE TABLE sequence_generator (
    name VARCHAR(50) PRIMARY KEY,
    value BIGINT NOT NULL
);