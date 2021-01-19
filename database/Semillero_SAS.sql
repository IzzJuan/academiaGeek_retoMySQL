CREATE DATABASE semillero_sas;

SHOW DATABASES;

USE semillero_sas;

DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS tipo_linea;
DROP TABLE IF EXISTS tipo_marca;

CREATE TABLE vehiculos (
    nro_placa VARCHAR(7) PRIMARY KEY,
    id_linea INT(5) UNSIGNED NOT NULL,
    modelo ENUM('Golf', 'ModelS', 'ModelX', 'Corolla', 'Hilux') NOT NULL,
    fecha_ven_seguro DATETIME NOT NULL,
    fecha_ven_tecnomecanica DATETIME NOT NULL,
    fecha_ven_contratodo DATETIME NOT NULL
);

CREATE TABLE tipo_linea(
    id_linea INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    desc_linea VARCHAR(255),
    -- No es necesario tener un descripcion a diferencia de otros datos que son más releveantes
    id_marca INT(5) UNSIGNED NOT NULL,
    activo ENUM('S','N') NOT NULL
);

CREATE TABLE tipo_marca(
    id_marca INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    desc_marca VARCHAR(255),
    -- No es necesario tener un descripcion a diferencia de otros datos que son más releveantes
    activo ENUM('S','N') NOT NULL
);

ALTER TABLE vehiculos
ADD CONSTRAINT fk_id_linea
FOREIGN KEY (id_linea) 
REFERENCES tipo_linea(id_linea);

ALTER TABLE tipo_linea
ADD CONSTRAINT fk_id_marca
FOREIGN KEY (id_marca) 
REFERENCES tipo_marca(id_marca);
