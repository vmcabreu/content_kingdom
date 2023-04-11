DROP DATABASE IF EXISTS contentkingdom;
CREATE DATABASE contentkingdom DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'contentkingdom'@'localhost' IDENTIFIED BY 'dawcontentkingdom';
GRANT ALL ON contentkingdom.* TO 'contentkingdom'@'localhost';

use contentkingdom;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT auto_increment,
  usuario varchar(30) NOT NULL UNIQUE,
  passwd varchar(120) NOT NULL,
  email varchar(40) NOT NULL UNIQUE,
  PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publicaciones (
  id INT auto_increment,
  id_usuario INT NOT NULL,
  id_videojuego INT,
  fecha DATE NOT NULL,
  megusta INT NOT NULL,
  mensaje TEXT NOT NULL,
  adjunto VARCHAR(150),
  plataforma VARCHAR(50),
  etiqueta VARCHAR(255),
  PRIMARY KEY(id),
  FOREIGN KEY (id_videojuego) REFERENCES videojuegos(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comentarios (
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  comentario TEXT NOT NULL,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS megusta (
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS videojuegos (
  id INT auto_increment,
  nombre varchar(100) NOT NULL UNIQUE,
  genero varchar(50) NOT NULL,
  fecha_lanzamiento DATE NOT NULL,
  plataforma varchar(50) NOT NULL,
  desarrolladores varchar(100) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS plataforma (
  id INT auto_increment,
  nombre varchar(50) NOT NULL,
  enlace varchar(255) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS amigos_usuarios (
  usuario_id INT NOT NULL,
  amigo_id INT NOT NULL,
  fecha_amistad DATE auto_increment,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (amigo_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;
  
--INSERT INTO usuarios VALUES
--(null,'admin','$2y$10$q8OBTcr1mWsu9rPg2OimqOSvUtjptKVyf9WM4rAGuAz5HXF32d6Nm','contentkingdom@support.com');

-- Tabla Megusta
-- Tabla comentarios