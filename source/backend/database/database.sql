DROP DATABASE IF EXISTS contentkingdom;
CREATE DATABASE contentkingdom DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'contentkingdom'@'localhost' IDENTIFIED BY 'dawcontentkingdom';
GRANT ALL ON contentkingdom.* TO 'contentkingdom'@'localhost';

use contentkingdom;

CREATE TABLE usuarios (
  id int(6) auto_increment,
  usuario varchar(30) NOT NULL UNIQUE,
  passwd varchar(120) NOT NULL,
  email varchar(40) NOT NULL UNIQUE,
  PRIMARY KEY(id)
) ENGINE=InnoDB;
  
INSERT INTO usuarios VALUES
(null,'admin','$2y$10$q8OBTcr1mWsu9rPg2OimqOSvUtjptKVyf9WM4rAGuAz5HXF32d6Nm','contentkingdom@support.com');

