-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS webBDD;
USE webBDD;

-- Crear la tabla contactos
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Opcional: Crear un índice para búsquedas por teléfono
CREATE INDEX idx_telefono ON contactos(telefono);