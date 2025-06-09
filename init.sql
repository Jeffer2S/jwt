-- Crear la base de datos (opcional, se crea automáticamente con MARIADB_DATABASE)
CREATE DATABASE IF NOT EXISTS api_central_hospitales;

-- Crear usuario y permisos (redundante por MARIADB_USER, pero por si acaso)
CREATE USER IF NOT EXISTS '${MARIADB_USER}'@'%' IDENTIFIED BY '${MARIADB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${MARIADB_DATABASE}.* TO '${MARIADB_USER}'@'%';
FLUSH PRIVILEGES;