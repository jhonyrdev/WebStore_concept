CREATE TABLE promocion (
    id_promocion INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    tipo_descuento ENUM('porcentaje','monto') NOT NULL,
    valor_descuento DECIMAL(10,2) NOT NULL,
    CHECK (valor_descuento > 0), 
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    CHECK (fecha_inicio <= fecha_fin), 
    estado ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_promocion)
);

CREATE TABLE producto_promocion (
    id_prod INT NOT NULL,
    id_promocion INT NOT NULL,

    PRIMARY KEY (id_prod, id_promocion),

    FOREIGN KEY (id_prod)
        REFERENCES producto(id_prod) ON DELETE CASCADE,

    FOREIGN KEY (id_promocion)
        REFERENCES promocion(id_promocion) ON DELETE CASCADE,

    INDEX idx_promocion (id_promocion)
);