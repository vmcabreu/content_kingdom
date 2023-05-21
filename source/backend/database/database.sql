DROP DATABASE IF EXISTS contentkingdom;
CREATE DATABASE contentkingdom DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'contentkingdom'@'localhost' IDENTIFIED BY 'dawcontentkingdom';
GRANT ALL ON contentkingdom.* TO 'contentkingdom'@'localhost';

use contentkingdom;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT auto_increment,
  usuario varchar(30) NOT NULL UNIQUE,
  passwd varchar(255) NOT NULL,
  email varchar(40) NOT NULL UNIQUE,
  PRIMARY KEY(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS perfil (
  id INT auto_increment,
  canales TEXT,
  profile_pic varchar(255),
  biografica varchar(255),
  profesion varchar(40),
  id_usuario INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS publicaciones (
  id INT auto_increment,
  id_usuario INT NOT NULL,
  id_videojuego INT,
  fecha DATE NOT NULL,
  megusta INT NOT NULL,
  mensaje TEXT NOT NULL,
  adjunto varchar(255),
  plataforma VARCHAR(50),
  PRIMARY KEY(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_videojuego) REFERENCES videojuegos(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comentarios (
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  comentario TEXT NOT NULL,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS megusta (
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS plataforma (
  id INT auto_increment,
  nombre varchar(50) NOT NULL,
  enlace varchar(255) NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS etiquetasPublicacion (
  id_etiqueta INT NOT NULL,
  id_publicacion INT NOT NULL,
  FOREIGN KEY (id_etiqueta) REFERENCES etiquetas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS amigos_usuarios (
  usuario_id INT NOT NULL,
  amigo_id INT NOT NULL,
  fecha_amistad DATE NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (amigo_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;
  
DELIMITER $$
CREATE TRIGGER insertar_perfil
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO perfil (canales, profile_pic, biografica, profesion, id_usuario)
  VALUES ('', '', '', '', NEW.id);
END $$
DELIMITER ;

INSERT INTO etiquetas (nombre) VALUES
  ('Meme'),
  ('Gameplay'),
  ('Edit'),
  ('Foto'),
  ('Ilustración'),
  ('Tremenda Jugada'),
  ('Clip'),
  ('Timing'),
  ('Comedia'),
  ('Horror'),
  ('Susto'),
  ('Reacción'),
  ('Evento'),
  ('Música'),
  ('OMG'),
  ('Collab'),
  ('AD');


INSERT INTO videojuegos (nombre, genero, fecha_lanzamiento, plataforma, desarrolladores, imagen) VALUES
('The Legend of Zelda: Breath of the Wild', 'acción-aventura', '2017-03-03', 'Switch', 'Nintendo EPD',"https://m.media-amazon.com/images/M/MV5BYjI3MjhiNjMtZjRlOC00MzQyLWEzMGMtZjY0MjhjNjRmMWI4XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Super Mario Odyssey', 'plataforma', '2017-10-27', 'Switch', 'Nintendo EPD',"https://m.media-amazon.com/images/M/MV5BN2ZmYjhkY2EtNTc0Ny00NzE4LTg4ZDctOTQzOGE1NmFiYTRjXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_FMjpg_UX1000_.jpg"),
('Animal Crossing: New Horizons', 'simulación social', '2020-03-20', 'Switch', 'Nintendo EPD',"https://m.media-amazon.com/images/M/MV5BY2ZjYjY2ZGMtZGMwNi00NjRlLWJlNmQtMGRlYTE4YjE4MGFjXkEyXkFqcGdeQXVyMzIwMjMyMzc@._V1_.jpg"),
('Splatoon 2', 'shooter en tercera persona', '2017-07-21', 'Switch', 'Nintendo EPD',"https://m.media-amazon.com/images/M/MV5BMTgyMjM3ZjEtZWQzZS00YTg3LTlhZGEtN2JkMWQwZDk1NjQ1XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Mario Kart 8 Deluxe', 'carreras', '2017-04-28', 'Switch', 'Nintendo EPD',"https://m.media-amazon.com/images/M/MV5BNjFmODJlMDItNTRjYi00NjYxLWI3YjgtMTE5Yjg4Y2U4MDFhXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Super Smash Bros. Ultimate', 'lucha', '2018-12-07', 'Switch', 'Bandai Namco Studios y Sora Ltd.',"https://m.media-amazon.com/images/M/MV5BNDQ2YjE5OTctODY1NC00ZDgxLTk0YmUtYWExZGE1Njg0ZDRlXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_FMjpg_UX1000_.jpg"),
('Stardew Valley', 'simulación de granja', '2017-10-05', 'Switch', 'ConcernedApe y Sickhead Games',"https://m.media-amazon.com/images/M/MV5BYmZiMWNlOWMtODMyNi00ZThiLTk0ZjYtOTQwMGRiNzE2NjFhXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Hades', 'roguelike', '2020-09-17', 'Switch', 'Supergiant Games',"https://m.media-amazon.com/images/M/MV5BMzNkMmE5MjktMzRhYS00MzZhLWEzYzMtMWFkYmE4MDk0NDZkXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Fire Emblem: Three Houses', 'estrategia', '2019-07-26', 'Switch', 'Intelligent Systems y Koei Tecmo',"https://m.media-amazon.com/images/M/MV5BMmQ5OTk4NDItNzkxMS00NDA2LWFiMGMtMzdlNmJhZjE4ZGExXkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_.jpg"),
('Monster Hunter Rise', 'acción', '2021-03-26', 'Switch', 'Capcom',"https://m.media-amazon.com/images/M/MV5BNzI3NmFmM2EtN2UwNC00NjMzLTljYWItN2MzMjcwYzJiZWMzXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('The Elder Scrolls V: Skyrim', 'acción-RPG', '2017-11-17', 'Switch', 'Bethesda Game Studios',"https://m.media-amazon.com/images/M/MV5BMzk1OWMyNzgtNDI4Mi00ZDYyLWFjZDItMjUwMGE3ZjFjOGQ5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition', 'RPG', '2019-09-27', 'Switch', 'Square Enix',"https://m.media-amazon.com/images/M/MV5BOTE4Mjc4YzgtZmM0MS00MmM2LTgwMmQtMzM1NTBiNWVkNTcwXkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_FMjpg_UX1000_.jpg"),
('Xenoblade Chronicles 2', 'RPG', '2017-12-01', 'Switch', 'Monolith Soft',"https://m.media-amazon.com/images/M/MV5BYTRiMzM3OWEtNGU1Yi00MmMwLTkzMDYtZTc4MjA0MmI2ZjQ1XkEyXkFqcGdeQXVyNjcwMzExMzU@._V1_FMjpg_UX1000_.jpg"),
('Bayonetta 2', 'acción', '2018-02-16', 'Switch', 'PlatinumGames',"https://m.media-amazon.com/images/M/MV5BMDRjMTliNjYtMjczNy00NzdmLTkwMWItZTczODM1MDEzZThlXkEyXkFqcGdeQXVyMzA2NzA3NjQ@._V1_FMjpg_UX1000_.jpg"),
('Diablo III: Eternal Collection', 'acción-RPG', '2018-11-02', 'Switch', 'Blizzard Entertainment',"https://m.media-amazon.com/images/M/MV5BYzNmNTE4OWUtYTRiZi00Y2FiLWE2NDEtNTNhNjE2ZDg0ODY5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('The Witcher 3: Wild Hunt – Complete Edition', 'acción-RPG', '2019-10-15', 'Switch', 'CD Projekt Red',"https://m.media-amazon.com/images/M/MV5BYTFiYWQ3NjMtZjA4Mi00YTkxLTkwYWEtNTkyNDE3ZTJjYjA2XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
('Octopath Traveler', 'RPG', '2018-07-13', 'Switch', 'Square Enix y Acquire',"https://m.media-amazon.com/images/M/MV5BNWQ0NmM0YzMtZDllMy00NzA2LWE4NWEtNTlhOGIwZTJiM2E3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Minecraft', 'sandbox', '2017-05-11', 'Switch', 'Mojang Studios',"https://m.media-amazon.com/images/M/MV5BYWIzYjUzMGUtZjJlNy00MWVlLWJjNGEtODU1OWFiOWIwOTFjXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Overwatch: Legendary Edition', 'shooter en primera persona', '2019-10-15', 'Switch', 'Blizzard Entertainment',"https://m.media-amazon.com/images/M/MV5BYjBkNTJkOWUtNTg1ZS00NGZhLWIxMGUtOWE0ZDA0NzRkODM3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
('Pokémon: Let´s Go, Pikachu!/Let´s Go, Eevee!', 'RPG', '2018-11-16', 'Switch', 'Game Freak',"https://m.media-amazon.com/images/M/MV5BYTQ3NGQ3M2EtMjg0MS00ZTQ5LThhYjQtNWZiMzkzNTY0ZjQ0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Civilization VI', 'estrategia', '2018-11-16', 'Switch', 'Firaxis Games y Aspyr',"https://m.media-amazon.com/images/M/MV5BYmE2YjdiMmMtNWQyMy00YjkxLTgzZTYtMmRlNjJjMjk5ZTUxXkEyXkFqcGdeQXVyNjg0NDY2NDE@._V1_FMjpg_UX1000_.jpg"),
('Dead Cells', 'roguelike', '2018-08-07', 'Switch', 'Motion Twin',"https://m.media-amazon.com/images/M/MV5BZDBjZDliOTUtYWI5Ni00NWVlLTg5ZGMtYzNmYWUyODg2YjdmXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Undertale', 'RPG', '2018-09-18', 'Switch', 'Toby Fox',"https://m.media-amazon.com/images/M/MV5BNzkwZDliNGEtMDNkNi00ODcxLWI1N2UtNDE1NmZlM2QyMTY4XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Hollow Knight', 'metroidvania', '2018-06-12', 'Switch', 'Team Cherry',"https://m.media-amazon.com/images/M/MV5BYTljYjM2OGYtNzU5NC00ODBiLTk4Y2ItMmE0ZDUxMzJmYWU4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"),
('Celeste', 'plataforma', '2018-01-25', 'Switch', 'Matt Makes Games',"https://m.media-amazon.com/images/M/MV5BM2VjODEzODItNGEwYi00ZDVmLWI2MmYtNDkxMGRhN2ZiZjk3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Bastion', 'acción-RPG', '2018-09-13', 'Switch', 'Supergiant Games',"https://m.media-amazon.com/images/M/MV5BZjFhNTczOTctZTk3ZC00OTk2LThmOTgtYjViMDdjYWYzNTJlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"),
('Transistor', 'acción-RPG', '2018-11-01', 'Switch', 'Supergiant Games',"https://m.media-amazon.com/images/M/MV5BNTMzNTE1OTAzN15BMl5BanBnXkFtZTgwNTQ2NzQwMjE@._V1_FMjpg_UX1000_.jpg"),
('Carrion', 'acción', '2020-07-23', 'Switch', 'Phobia Game Studio',"https://m.media-amazon.com/images/M/MV5BMGZmZmJjODQtZjcyYS00ZjA2LWJmNDUtOGQ2ODIzMmY0N2IyXkEyXkFqcGdeQXVyNTM0MjE5NTc@._V1_FMjpg_UX1000_.jpg"),
('Enter the Gungeon', 'roguelike', '2017-12-14', 'Switch', 'Dodge Roll',"https://m.media-amazon.com/images/M/MV5BYjk5NWMyYzMtODEyNS00MTZlLThiMjktZWZjMjZjODkyODdkXkEyXkFqcGdeQXVyMzc3MzExMw@@._V1_FMjpg_UX1000_.jpg"),
('Ori and the Blind Forest: Definitive Edition', 'plataforma', '2019-09-27', 'Switch', 'Moon Studios',"https://m.media-amazon.com/images/M/MV5BZjFkY2I2NmQtZTZkNC00NjAzLThmYTYtNWVjZGI0NmM0NWYyXkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_FMjpg_UX1000_.jpg"),
('Ori and the Will of the Wisps', 'plataforma', '2020-09-17', 'Switch', 'Moon Studios',"https://m.media-amazon.com/images/M/MV5BNzIwODMwOTUtZWIwOC00OWMyLTgxZmItODZiZTc2NWFkZTQ0XkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg"),
('Katana ZERO', 'plataforma', '2019-04-18', 'Switch', 'Askiisoft',"https://m.media-amazon.com/images/M/MV5BZDVkYmJkMzktMWI2YS00YmZiLWEwZjgtNTA4MWM5NDNmMjY2XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Astral Chain', 'acción', '2019-08-30', 'Switch', 'PlatinumGames',"https://m.media-amazon.com/images/M/MV5BMjViNGI5YzAtMGUzMC00MTAyLWI5MDQtZWEyYWY1NmQyMjg1XkEyXkFqcGdeQXVyOTY0Nzk1MzI@._V1_FMjpg_UX1000_.jpg"),
('Ni no Kuni: Wrath of the White Witch', 'RPG', '2019-09-20', 'Switch', 'Level-5',"https://m.media-amazon.com/images/M/MV5BNzE2NjU5ZmQtZWZhMS00ZDI2LWE5ZTgtMjRmMjE5Njk5ZDBjXkEyXkFqcGdeQXVyMTAwNTkxNjI5._V1_.jpg"),
('Mario + Rabbids Kingdom Battle', 'estrategia', '2017-08-29', 'Switch', 'Ubisoft',"https://m.media-amazon.com/images/M/MV5BMzNiYmU1OWEtNzJjNS00MzI1LWJmOGEtYTM4OTA3ZDYzZjYzXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('The Messenger', 'plataforma', '2018-08-30', 'Switch', 'Sabotage Studio',"https://m.media-amazon.com/images/M/MV5BMmExYTkwY2QtMmQ3Yy00MGFlLWE3MzgtMjJjNDZmOGExNGY0XkEyXkFqcGdeQXVyNTM0MjE5NTc@._V1_.jpg"),
('Hyrule Warriors: Age of Calamity', 'acción', '2020-11-20', 'Switch', 'Koei Tecmo y Omega Force',"https://m.media-amazon.com/images/M/MV5BODU3NjcwNzctODVmZi00N2ZhLWIxNzYtZmE4ZDg4Y2QwYzBmXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_FMjpg_UX1000_.jpg"),
('Mortal Kombat 11 Ultimate', 'lucha', '2020-11-17', 'Switch', 'NetherRealm Studios',"https://m.media-amazon.com/images/M/MV5BYjUzMDc1ZGEtOTMzZi00OTIzLTkwNDEtZDBkNWQ4NTFmM2ZmXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Pokémon Sword/Shield', 'RPG', '2019-11-15', 'Switch', 'Game Freak',"https://m.media-amazon.com/images/M/MV5BNmQyN2MzMWUtMGI4NS00NmRlLWE5MzYtYjRiMmU4ODI1ZDNlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Bloodborne', 'Acción-RPG', '2015-03-24', 'PS4', 'FromSoftware',"https://m.media-amazon.com/images/M/MV5BYzYyYjdmMTUtNGEwMi00YjQ3LThlZmYtZjUyNDkwYzBjOGE1XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('The Witcher 3: Wild Hunt', 'RPG', '2015-05-19', 'PS4', 'CD Projekt Red',"https://m.media-amazon.com/images/M/MV5BMDU4ODc1M2UtODg3Ny00NDViLTkxNmQtMzMzZWM1NGRmYTNjXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg"),
('Batman: Arkham Knight', 'Acción-Aventura', '2015-06-23', 'PS4', 'Rocksteady Studios',"https://m.media-amazon.com/images/M/MV5BZWRjMWM0MGUtYzI2NC00MTQ4LWIyYWYtYmIwNzkwYzRjYjI1XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Until Dawn', 'Aventura interactiva', '2015-08-25', 'PS4', 'Supermassive Games',"https://m.media-amazon.com/images/M/MV5BOTVlYWVmOTYtNGI3OS00YWUyLTlkZDItMDA4ZWZiNjVmZmZmXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_.jpg"),
('Metal Gear Solid V: The Phantom Pain', 'Acción-Aventura', '2015-09-01', 'PS4', 'Kojima Productions',"https://m.media-amazon.com/images/M/MV5BNjY5Y2Q2YjktNTIwYi00NGY4LTgyYTgtZDc3NzE0NGZmODNhXkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg"),
('Assassin´s Creed Syndicate', 'Acción-Aventura', '2015-10-23', 'PS4', 'Ubisoft Quebec',"https://m.media-amazon.com/images/M/MV5BZTk4ZWNiOWYtYzdkMi00M2VjLWJjZDYtMGYzNDEyODA5YTE5XkEyXkFqcGdeQXVyNjgyOTk3MTA@._V1_FMjpg_UX1000_.jpg"),
('Fallout 4', 'RPG', '2015-11-10', 'PS4', 'Bethesda Game Studios',"https://m.media-amazon.com/images/M/MV5BZDU1MzViNDEtNGNhMC00MDQ2LWI1NzItNzZmYWNlODkxMWZlXkEyXkFqcGdeQXVyNjgyODQ1Mzk@._V1_FMjpg_UX1000_.jpg"),
('Just Cause 3', 'Acción-Aventura', '2015-12-01', 'PS4', 'Avalanche Studios',"https://m.media-amazon.com/images/M/MV5BODFhMzJmOGEtYzczMC00YzVmLTk5MTItZGNkMjg2N2QzNGRiXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Uncharted: The Nathan Drake Collection', 'Acción-Aventura', '2015-10-07', 'PS4', 'Bluepoint Games',"https://m.media-amazon.com/images/M/MV5BNGNmODM2MGQtNzhkZS00ZjY2LWI4NDQtOTAxZTBmNzUxZDBlXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_FMjpg_UX1000_.jpg"),
('Firewatch', 'Aventura', '2016-02-09', 'PS4', 'Campo Santo',"https://m.media-amazon.com/images/M/MV5BZGI5Njg5M2QtZGNlNC00MGUzLWExMGYtNmUwMTJlZWI1NGE4XkEyXkFqcGdeQXVyNTQ1MzAwODA@._V1_FMjpg_UX1000_.jpg"),
('Far Cry Primal', 'Acción-Aventura', '2016-02-23', 'PS4', 'Ubisoft Montreal',"https://m.media-amazon.com/images/M/MV5BMmQzYjE0NGQtMmNiOS00OTc4LTk4ZjgtNzM2NGQ5YmFhNThkXkEyXkFqcGdeQXVyNzg3NjQyOQ@@._V1_FMjpg_UX1000_.jpg"),
('The Division', 'Acción-RPG', '2016-03-08', 'PS4', 'Ubisoft Massive',"https://m.media-amazon.com/images/M/MV5BODJhN2RkOTItOGRlNC00ODU1LThhMmEtNjIxMWQzYzc1MDI0XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Dark Souls III', 'Acción-RPG', '2016-03-24', 'PS4', 'FromSoftware',"https://m.media-amazon.com/images/M/MV5BYzJhYTgzYzYtYjdjOC00ZDYyLTg0NjYtZDEwMDlkODA3OWI4XkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Ratchet & Clank', 'Plataformas', '2016-04-12', 'PS4', 'Insomniac Games',"https://m.media-amazon.com/images/M/MV5BMzgyY2QzZjAtNGYwMy00NTY2LTljYzktNWZiMzMxNGEyMWQxXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Uncharted 4: A Thief´s End', 'Acción-Aventura', '2016-05-10', 'PS4', 'Naughty Dog',"https://m.media-amazon.com/images/M/MV5BMTYzYzIxMjktMDM4NS00MTM5LWJlMDgtNDRhMDNhOGRmY2EwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Doom', 'Shooter', '2016-05-13', 'PS4', 'id Software',"https://m.media-amazon.com/images/M/MV5BMWRlOWVjZjMtZDJiZi00ZGUxLTlmNmEtYzg0MTE0MmI1NTQyXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Overwatch', 'Shooter', '2016-05-24', 'PS4', 'Blizzard Entertainment',"https://m.media-amazon.com/images/M/MV5BYjBkNTJkOWUtNTg1ZS00NGZhLWIxMGUtOWE0ZDA0NzRkODM3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
('Mirror´s Edge Catalyst', 'Acción-Aventura', '2016-06-07', 'PS4', 'EA DICE',"https://m.media-amazon.com/images/M/MV5BNDk0OWEyZjItODQ0Mi00NDRiLTgzNzgtYTI3NmQzNzg1N2RiXkEyXkFqcGdeQXVyMTk5NDI0MA@@._V1_FMjpg_UX1000_.jpg"),
('Deus Ex: Mankind Divided', 'Acción-RPG', '2016-08-23', 'PS4', 'Eidos Montreal',"https://m.media-amazon.com/images/M/MV5BZmVhNWM0NDItODI0ZC00ZDhkLTg0ZjYtY2E4NGY2NzNjMjhiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"),
('Dishonored 2', 'Acción-Aventura', '2016-11-11', 'PS4', 'Arkane Studios',"https://m.media-amazon.com/images/M/MV5BZDg1MzE2YmUtNDM3Yy00ODYyLWEzZDAtMzI1ZmYyNjc4NDFlXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Final Fantasy XV', 'RPG', '2016-11-29', 'PS4', 'Square Enix',"https://m.media-amazon.com/images/M/MV5BYmQxMjM4NGUtNmU5Mi00MjJhLTg5MzMtMTkzZDI2ZjlkYzE4XkEyXkFqcGdeQXVyNjUxNDQwMzA@._V1_FMjpg_UX1000_.jpg"),
('The Last Guardian', 'Acción-Aventura', '2016-12-06', 'PS4', 'GenDesign',"https://m.media-amazon.com/images/M/MV5BMGNiZmQxNzYtODZmNS00MzBjLWIxYTAtNmY3NzBiZGIwZTYwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Gravity Rush 2', 'Acción-Aventura', '2017-01-18', 'PS4', 'SCE Japan Studio',"https://m.media-amazon.com/images/M/MV5BY2RhNDI1YzMtYjY3Mi00NTgwLWFkZmUtZTE1NjY1MDllYWMwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('For Honor', 'Acción-Aventura', '2017-02-14', 'PS4', 'Ubisoft Montreal',"https://m.media-amazon.com/images/M/MV5BZGYxMGJmMTUtYWU3Yy00MTRjLWJlZGItOTJhNjhmNTNlMTI1XkEyXkFqcGdeQXVyMTM1NTkzOTA@._V1_FMjpg_UX1000_.jpg"),
('Nier: Automata', 'Acción-RPG', '2017-02-23', 'PS4', 'PlatinumGames',"https://m.media-amazon.com/images/M/MV5BZDI2ZDAwNDUtN2JhOC00NDg5LWIwZjItOGY0N2Y0YzVmN2M0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Nier: Replicant', 'Acción-RPG', '2017-02-23', 'PS4', 'PlatinumGames',"https://m.media-amazon.com/images/M/MV5BMWFiNTMyYTgtZDQ5OS00MmIyLWIzNjktNjBiNTViZDkwNGIxXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg"),
('Horizon Zero Dawn', 'Acción-Aventura', '2017-02-28', 'PS4', 'Guerrilla Games',"https://m.media-amazon.com/images/M/MV5BY2M5Y2I4MjItNWJkZC00M2Y1LThmNTMtNjVlZDhiYWRjODhhXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg"),
('Persona 5', 'RPG', '2017-04-04', 'PS4', 'Atlus',"https://m.media-amazon.com/images/M/MV5BMzQ5MzQyOTctMDY5ZC00YmNiLWI3YjMtMDQxNjE0ZTcwNWY5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Little Nightmares', 'Aventura', '2017-04-28', 'PS4', 'Tarsier Studios',"https://m.media-amazon.com/images/M/MV5BMTNjZjY2MGEtMDE5Ni00NThhLWE3ZDgtY2Y4ZWQ5ZjY3ZWRhXkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg"),
('Prey', 'Shooter', '2017-05-05', 'PS4', 'Arkane Studios',"https://m.media-amazon.com/images/M/MV5BOTQ5ZDljNWMtNzQ4MC00OTkyLTg1MGUtN2ExMTZmNTdkMWQ3XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Injustice 2', 'Lucha', '2017-05-16', 'PS4', 'NetherRealm Studios',"https://m.media-amazon.com/images/M/MV5BMTU4MDE3NjItZWY3ZS00NDhkLThhYjYtMjBmM2RmNTFhMmJhXkEyXkFqcGdeQXVyNTQ2MjM5MTg@._V1_FMjpg_UX1000_.jpg"),
('Tekken 7', 'Lucha', '2017-06-02', 'PS4', 'Bandai Namco Studios',"https://m.media-amazon.com/images/M/MV5BNWM4MjE1YTItMDFjOC00MDBiLWE2ZGYtNTU2Y2IwYzhhOGJjXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
('Uncharted: The Lost Legacy', 'Acción-Aventura', '2017-08-22', 'PS4', 'Naughty Dog',"https://m.media-amazon.com/images/M/MV5BNjRmN2EzYTEtYzNlYy00ZDc4LWJlZDgtMDQzYjM0Njg5NmYyXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Yakuza Kiwami', 'Acción-Aventura', '2017-08-29', 'PS4', 'Sega',"https://m.media-amazon.com/images/M/MV5BZDllYmYwZTItMzMyYy00YmY2LWI3ZmEtNDY0NDhiODIzYTgzXkEyXkFqcGdeQXVyMTI3NjAwMTA1._V1_FMjpg_UX1000_.jpg"),
('Danganronpa V3: Killing Harmony', 'Aventura', '2017-09-26', 'PS4', 'Spike Chunsoft',"https://m.media-amazon.com/images/M/MV5BNDc1MzNlNjktOGRlMy00OTU4LTkzOWYtNDAwNjA5N2RhMWNmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Cuphead', 'Run and gun', '2017-09-29', 'PS4', 'StudioMDHR',"https://m.media-amazon.com/images/M/MV5BZjcwMmFlMjEtNDdmMC00ZjA1LWI4Y2MtOTc4MDM2ZDhkOTE0XkEyXkFqcGdeQXVyMTg2NzgzMDE@._V1_.jpg"),
('Middle-earth: Shadow of War', 'Acción-Aventura', '2017-10-10', 'PS4', 'Monolith Productions',"https://m.media-amazon.com/images/M/MV5BYWYxOGVjZDUtMWMyYy00YWY3LTg0NzktZDJmYjUxMWZmOTZkXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('The Evil Within 2', 'Survival horror', '2017-10-13', 'PS4', 'Tango Gameworks',"https://m.media-amazon.com/images/M/MV5BNjAzMjA5MjUtYWY4MS00YjNhLWE1NjYtMDAwMDQwY2Q4NjBmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('South Park: The Fractured But Whole', 'RPG', '2017-10-17', 'PS4', 'Ubisoft San Francisco',"https://m.media-amazon.com/images/M/MV5BMTcxNDMzNTYtMzVjYy00YTFiLWIyODItZWYzYzNlYjBkMGU4XkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_FMjpg_UX1000_.jpg"),
('Assassin´s Creed Origins', 'Acción-Aventura', '2017-10-27', 'PS4', 'Ubisoft Montreal',"https://m.media-amazon.com/images/M/MV5BNzk5ZDMzYzQtODIzMS00MmJkLWI5NjUtMDg5N2EyZjM1NjU5XkEyXkFqcGdeQXVyNzc0MDY4Mzc@._V1_FMjpg_UX1000_.jpg"),
('Dead Rising 4','Survival horror','2017-12-05','PS4','Capcom Vancouver',"https://m.media-amazon.com/images/M/MV5BYTU1MDBiMzMtYjUwMy00ZWYyLThlMWYtMGQxNWZmZmVjYzZjXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Okami HD','Acción-Aventura','2017-12-12','PS4','Clover Studio',"https://m.media-amazon.com/images/M/MV5BMjE2MTQ4OGItM2FhNi00ZmNiLTg3OTAtNmU0MmYwYjI3ZDE0XkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_.jpg"),
('Street Fighter V: Arcade Edition','Lucha','2018-01-16','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BMDEwYThhZjktMjI2My00ZDdjLWI3MjAtY2MwNjJkOWFiZTI2XkEyXkFqcGdeQXVyMTk5NDI0MA@@._V1_FMjpg_UX1000_.jpg"),
('Monster Hunter: World','Acción-RPG','2018-01-26','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BYzdkMDBjODAtZjUzNC00ZTcyLWFkYzgtOWMxMWZjN2VkODNjXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_FMjpg_UX1000_.jpg"),
('Shadow of the Colossus','Acción-Aventura','2018-02-06','PS4','Bluepoint Games',"https://m.media-amazon.com/images/M/MV5BMTk3YTFjYzItMDFmNS00NTgxLWE1YzAtODQzNzYwMDNjMTM5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Dragon Ball FighterZ','Lucha','2018-01-26','PS4','Arc System Works',"https://m.media-amazon.com/images/M/MV5BYmNkYTMyOTgtZjc4Yi00NmY4LWI5NTQtMTE4NWY4NTIyNTc1XkEyXkFqcGdeQXVyNjc1ODU3OTE@._V1_QL75_UY281_CR77,0,190,281_.jpg"),
('Kingdom Come: Deliverance','RPG','2018-02-13','PS4','Warhorse Studios',"https://m.media-amazon.com/images/M/MV5BMjMxMzhiMDktZDlmYy00NDMwLTllYWQtMWVjYmRjNGIxZDJiXkEyXkFqcGdeQXVyNzg3NjQyOQ@@._V1_FMjpg_UX1000_.jpg"),
('Metal Gear Survive','Acción-Aventura','2018-02-20','PS4','Konami',"https://m.media-amazon.com/images/M/MV5BNWJiNTE0MTQtYjkyOC00ZWYzLWE4NmEtYWUwMzllNGVlNGYwXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Ni no Kuni II: Revenant Kingdom','RPG','2018-03-23','PS4','Level-5',"https://m.media-amazon.com/images/M/MV5BNTY4YzUyNGYtZWNlMC00MmQ5LWIyMDAtYzBmYzRhYjM5MjZiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjQ5OTgzMDE@._V1_QL75_UY281_CR93,0,190,281_.jpg"),
('Far Cry 5','Shooter','2018-03-27','PS4','Ubisoft Montreal',"https://m.media-amazon.com/images/M/MV5BYmQwYmNmZTEtMDE4NC00MGIzLTkxMmEtNjhiN2IwZWUzYWViXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_FMjpg_UX1000_.jpg"),
('God of War','Acción-Aventura','2018-04-20','PS4','SIE Santa Monica Studio',"https://m.media-amazon.com/images/M/MV5BZjc2NmExYWEtMTllNi00NTc5LTliZDgtMWRmMjQzMjg1NDJmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Frostpunk','Estrategia','2018-04-24','PS4','11 bit studios',"https://m.media-amazon.com/images/M/MV5BYjM5ZWRkMWEtYTM2Yy00Yjg2LTlkMTEtOWI2ZmVmNzVhODMxXkEyXkFqcGdeQXVyNzg3NjQyOQ@@._V1_.jpg"),
('Dark Souls Remastered','Acción-RPG','2018-05-25','PS4','FromSoftware',"https://m.media-amazon.com/images/M/MV5BMWQ2OGQ5OTQtMjM4Mi00YzgzLThiM2UtNjZhNDVlY2RhODlhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"),
('Jurassic World Evolution','Simulación de gestión','2018-06-12','PS4','Frontier Developments',"https://m.media-amazon.com/images/M/MV5BYWY2YThmMzctZWQyZS00NTQyLWFjNTUtMzg0NmVmMDcyNzc1XkEyXkFqcGdeQXVyODE5MzM1MTc@._V1_FMjpg_UX1000_.jpg"),
('The Crew 2','Racing','2018-06-29','PS4','Ivory Tower',"https://m.media-amazon.com/images/M/MV5BYTk0YWQyYTgtZDBhMC00N2NmLWI5MmMtNmZmMTA0ODZlNDdjXkEyXkFqcGdeQXVyNzk0NTM2MTM@._V1_.jpg"),
('The Banner Saga 3','RPG táctico','2018-07-24','PS4','Stoic Studio',"https://m.media-amazon.com/images/M/MV5BNmU4ZDczMmQtZDk1My00ZDgxLTk0MDgtZTZkMzNkMTM2YTQ0XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_.jpg"),
('Yakuza 0','Acción-Aventura','2018-08-01','PS4','Sega',"https://m.media-amazon.com/images/M/MV5BYzhjNjdhMTMtNTQ5Zi00ZGZlLWE4NWEtMmRkNGZiMjEyYjY0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Monster Hunter Generations Ultimate','Acción-RPG','2018-08-28','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BNzZhOWUyODEtZjMxNi00MGNhLWFhOWMtZjIxMThhMDZlNzQyXkEyXkFqcGdeQXVyNjU3OTI4MDU@._V1_FMjpg_UX1000_.jpg"),
('Marvel´s Spider-Man','Acción-Aventura','2018-09-07','PS4','Insomniac Games',"https://m.media-amazon.com/images/M/MV5BNGQ5YjE0NWYtNDRmNS00MzEyLTgzOWUtZTdiMDk5ZThiZmZkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Shadow of the Tomb Raider','Acción-Aventura','2018-09-14','PS4','Eidos Montréal',"https://m.media-amazon.com/images/M/MV5BNjU2MzNkYjctZTUyNy00MDg1LWFjZmUtNGFlMTU5ZWJiMWVjXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Red Dead Redemption 2','Acción-Aventura','2018-10-26','PS4','Rockstar Studios',"https://m.media-amazon.com/images/M/MV5BMjMyZDY5NTctMzQ0Ny00ZTU0LWE1ZDYtNDYzMjAxYjA1ZGYxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Fallout 76','RPG','2018-11-14','PS4','Bethesda Game Studios',"https://m.media-amazon.com/images/M/MV5BMDRiYzdhNjAtMDM0OC00YWZmLWIxOWEtYTIzODQ1MjMyMWU1XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Just Cause 4','Acción-Aventura','2018-12-04','PS4','Avalanche Studios',"https://m.media-amazon.com/images/M/MV5BMzI2NzNjYjctMmRiZS00MDRjLWFmNDQtOGQzOWVlZjVhOTg2XkEyXkFqcGdeQXVyNzg3NjQyOQ@@._V1_FMjpg_UX1000_.jpg"),
('Kingdom Hearts III','RPG','2019-01-29','PS4','Square Enix',"https://m.media-amazon.com/images/M/MV5BNDkyODZlYzEtYTRjMS00NjUyLWIzOWQtMWVhNjE4YmE0MDkzXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_QL75_UY281_CR1,0,190,281_.jpg"),
('Anthem','Shooter','2019-02-22','PS4','BioWare',"https://m.media-amazon.com/images/M/MV5BYzViYzc1M2QtNGNjNC00ODM0LWJlNDAtYjgzMTQyMjNkNGU2XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_.jpg"),
('Devil May Cry 5','Acción','2019-03-08','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BMjcwZmJlNjQtZGQ2YS00MDVmLTk0YTgtZjk2OWQwYTRjMWYwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Sekiro: Shadows Die Twice','Acción-Aventura','2019-03-22','PS4','FromSoftware',"https://m.media-amazon.com/images/M/MV5BMzhjMGE4ZWQtM2ZhNy00OWJjLThkMTUtZTkwMTc3ZDJjODg2XkEyXkFqcGdeQXVyMTk5NDI0MA@@._V1_FMjpg_UX1000_.jpg"),
('The Division 2','Shooter','2019-03-15','PS4','Massive Entertainment',"https://m.media-amazon.com/images/M/MV5BZGVjNjNmNTctZmM1Yi00N2JhLTk0MmYtOWM0OTYxNTQ0ZWYzXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Days Gone','Acción-Aventura','2019-04-26','PS4','SIE Bend Studio',"https://m.media-amazon.com/images/M/MV5BMzdhNThjYzEtMDRmNi00MmY2LWJkMWItZWUzY2ZjOTcwOTQyXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Rage 2','Shooter','2019-05-14','PS4','Avalanche Studios',"https://m.media-amazon.com/images/M/MV5BNGM0NDkzZGItOTJhOS00NjRlLTgzNDgtM2U1YWJlMjIxN2RhXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Team Sonic Racing','Carreras','2019-05-21','PS4','Sumo Digital',"https://m.media-amazon.com/images/M/MV5BMjExOWQyYTktZWQ3MS00Nzg2LWI5ZDktZTI1MTc4OTFkMGU2XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_FMjpg_UX1000_.jpg"),
('Crash Team Racing Nitro-Fueled','Carreras','2019-06-21','PS4','Beenox',"https://m.media-amazon.com/images/M/MV5BMDIxYTBlMDMtODc1My00MDhkLTlhM2QtYzMyZjEzYTRkNzZmXkEyXkFqcGdeQXVyMzY0MDAyMDI@._V1_FMjpg_UX1000_.jpg"),
('Judgment','Acción-Aventura','2019-06-25','PS4','Ryu ga Gotoku Studio',"https://m.media-amazon.com/images/M/MV5BMjc3ZGRmMjctYjA2Yi00YmI3LWFkM2QtNTRkZWU2ZmQwNzU0XkEyXkFqcGdeQXVyNTY1NTA1ODc@._V1_FMjpg_UX1000_.jpg"),
('Bloodstained: Ritual of the Night','Acción-Aventura','2019-06-18','PS4','ArtPlay',"https://m.media-amazon.com/images/M/MV5BNmUxYmM3OTgtZTNkMi00ZTMwLWFmMmMtZmFiYjFlN2Q1ODdjXkEyXkFqcGdeQXVyNTk5Nzg0MDE@._V1_FMjpg_UX1000_.jpg"),
('Fire Emblem: Three Houses','RPG táctico','2019-07-26','PS4','Intelligent Systems',"https://m.media-amazon.com/images/M/MV5BMmQ5OTk4NDItNzkxMS00NDA2LWFiMGMtMzdlNmJhZjE4ZGExXkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_FMjpg_UX1000_.jpg"),
('Wolfenstein: Youngblood','Shooter','2019-07-26','PS4','MachineGames',"https://m.media-amazon.com/images/M/MV5BM2M3OTcxNzEtODcwZi00MDE4LWI1OGQtODA5ODIwMzA3OGE5XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Madden NFL 20','Deportes','2019-08-02','PS4','EA Tiburon',"https://m.media-amazon.com/images/M/MV5BNTliNTE2NTQtZjJjZS00NjdhLTllYmUtZWY1YjJhZGJhYWFmXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('Control','Acción-Aventura','2019-08-27','PS4','Remedy Entertainment',"https://m.media-amazon.com/images/M/MV5BMjM3MzUzYzYtODA1Zi00YzI5LWFhNTAtOWFkNzEzYmMwOTVmXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Borderlands 3','Shooter','2019-09-13','PS4','Gearbox Software',"https://m.media-amazon.com/images/M/MV5BNzJlYzhlY2EtNDE5ZC00Mjk2LWExYzQtNTE5MjAxNWNjODg5XkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
('GreedFall','RPG','2019-09-10','PS4','Spiders',"https://m.media-amazon.com/images/M/MV5BZjczMDgwYTgtNmNhZS00OTYxLThkMjgtYzM4ZTc4NzUxMGNkXkEyXkFqcGdeQXVyODg1MTc3MTM@._V1_FMjpg_UX1000_.jpg"),
('FIFA 20','Deportes','2019-09-27','PS4','EA Sports',"https://m.media-amazon.com/images/M/MV5BOWQyZTBhYjAtZjU2Yy00ZjMzLTk1ZGEtNjIxMDNkZjQxYWI3XkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_FMjpg_UX1000_.jpg"),
('Call of Duty: Modern Warfare','Shooter','2019-10-25','PS4','Infinity Ward',"https://m.media-amazon.com/images/M/MV5BZWMzYzhjZjYtNmRkOC00ZTc0LWI1ZGItODcxYTYwYmJjOTQ2XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"),
('Death Stranding','Acción-Aventura','2019-11-08','PS4','Kojima Productions',"https://m.media-amazon.com/images/M/MV5BMjIxZTljZGItZTIwYS00ZjIzLWJlZTMtZWIyODg0NjA0NTNmXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Star Wars Jedi: Fallen Order','Acción-Aventura','2019-11-15','PS4','Respawn Entertainment',"https://m.media-amazon.com/images/M/MV5BN2FiYjJlNGItMzU1My00ZDc3LTg4YTktM2YxMDkwMGE4YTZkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
('Darksiders Genesis','Acción-Aventura','2019-12-05','PS4','Airship Syndicate',"https://m.media-amazon.com/images/M/MV5BNjdjMjRiODktMDg1Ni00YmE3LTk1YWItNjA2MWM0ZDhiZjhmXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('The Outer Worlds','RPG','2019-10-25','PS4','Obsidian Entertainment',"https://m.media-amazon.com/images/M/MV5BMTJjNjMxMTctZDliMC00MGI2LWIwZjktNjQxOGY0M2EzOTY4XkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_FMjpg_UX1000_.jpg"),
('Resident Evil 2 Remake','Survival horror','2019-01-25','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BOTYwYzg3MDgtYWY0Yi00MzZmLWI4MzUtOTBmY2U3NmM4NWQ0XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
('Resident Evil 3 Remake','Survival horror','2020-04-03','PS4','Capcom',"https://m.media-amazon.com/images/M/MV5BNzQ2OTgxN2MtN2NmNC00ZTNlLTliMjItMmEzMmFjODIxYzM4XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
('Final Fantasy VII Remake','RPG','2020-04-10','PS4','Square Enix',"https://m.media-amazon.com/images/M/MV5BOGM5MGFmZmMtYWUzYi00MDc2LTg5OGQtYTk2Y2NiOTQ4YWEwXkEyXkFqcGdeQXVyMTI1Mzg0ODA5._V1_FMjpg_UX1000_.jpg"),
('MotoGP 20','Deportes','2020-04-23','PS4','Milestone S.r.l.',"https://m.media-amazon.com/images/M/MV5BNTM3OGEzNjQtZDRiNS00ZDgyLTg2NGUtZWZlM2JmMjgwNDFjXkEyXkFqcGdeQXVyNDIwOTkyNjM@._V1_FMjpg_UX1000_.jpg"),
('Predator: Hunting Grounds','Shooter','2020-04-24','PS4','IllFonic',"https://m.media-amazon.com/images/M/MV5BYTJhZjQ3NjYtMTk1NC00MmUxLTg0N2YtY2ZmNWExY2RmY2JlXkEyXkFqcGdeQXVyMTEzNzAxNDU1._V1_.jpg"),
('Minecraft Dungeons','RPG','2020-05-26','PS4','Mojang Studios',"https://m.media-amazon.com/images/M/MV5BZGM4YTIxMDMtNWZiZi00OTEzLTk2MWUtY2NlMzhhODUzYWZiXkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg"),
('The Last of Us Part II', 'Acción-Aventura', '2020-06-19', 'PS4', 'Naughty Dog',"https://m.media-amazon.com/images/M/MV5BODUwNWY5YjctNDZkNy00ZTY1LWEzMzItZGVkYTllOWVjOTc3XkEyXkFqcGdeQXVyNjU4NTIxNzI@._V1_FMjpg_UX1000_.jpg"),
('Ghosts of Tsushima', 'Acción-Aventura', '2020-07-17', 'PS4', 'Sucker Punch Productions',"https://m.media-amazon.com/images/M/MV5BMjEwYjRjZjctNWRmNy00NDA1LWE1MjYtYTlhMWIzZGNhMWYxXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_FMjpg_UX1000_.jpg"),
('Destroy All Humans!', 'Acción-Aventura', '2020-07-28', 'PS4', 'Black Forest Games',"https://m.media-amazon.com/images/M/MV5BYmFjMGY5NTUtNTRkNC00YTJkLWE4NjMtN2M5NGJjMTE1ZWM1XkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg"),
('Fall Guys: Ultimate Knockout', 'Battle royale', '2020-08-04', 'PS4', 'Mediatonic',"https://m.media-amazon.com/images/M/MV5BZmMwNWI5ZjMtMzY2YS00MDJhLWI1MjEtZTAwNzljMmNhMTA3XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg"),
("Super Mario 64","Plataformas","1996-06-23","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BNjQzZmQzNWMtZTVmOS00NjU4LTlmNjktOTM2MDQwMjgxMmY0XkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_FMjpg_UX1000_.jpg"),
("The Legend of Zelda: Ocarina of Time","Acción-Aventura","1998-11-21","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BZjFkNTA0OGEtYjk5OC00ZDM1LWJmN2QtM2JjY2M1ZTAyYjZlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("GoldenEye 007","Shooter en primera persona","1997-08-25","Nintendo 64","Rare","https://m.media-amazon.com/images/M/MV5BODUzODUwNzA4MF5BMl5BanBnXkFtZTgwMzYxNDcxMzE@._V1_.jpg"),
("Mario Kart 64","Carreras","1996-12-14","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BNzNhZDg2ODctOGZkZi00OTJmLWJiMDYtMDM5YmMxMTQ4ODRjXkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_.jpg"),
("Banjo-Kazooie","Plataformas","1998-06-29","Nintendo 64","Rare","https://m.media-amazon.com/images/M/MV5BMGYyMTU2ZDMtZWY1Ny00NDQwLTkyYTQtYzVmNjU5OTU1NTM5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Diddy Kong Racing","Carreras","1997-11-21","Nintendo 64","Rare","https://m.media-amazon.com/images/M/MV5BMGRmNzMwMTUtZDFjNi00ZjNkLWI2NGMtODg4ZGI5MWE0NjY3XkEyXkFqcGdeQXVyMTA3NjAwMDc4._V1_FMjpg_UX1000_.jpg"),
("Star Fox 64","Simulador de vuelo, Shooter en tercera persona","1997-04-27","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BYTI1M2YzYWQtZWU3OS00Mzc5LWFiMTktNjk5ZTAxMzhhY2ZhXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
("Perfect Dark","Shooter en primera persona","2000-05-22","Nintendo 64","Rare", "https://m.media-amazon.com/images/M/MV5BY2Y5MzY5MmItNjk0YS00MTJjLWE0NWMtZWY4NjExZjcxYmI2XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Donkey Kong 64","Plataformas, Aventura","1999-11-22","Nintendo 64","Rare","https://m.media-amazon.com/images/M/MV5BYjZlOWZkNWYtMDhiYS00YjFhLWJhNjItMjY2YzRlMDNkYWIyXkEyXkFqcGdeQXVyNjcyNzkwMTc@._V1_FMjpg_UX1000_.jpg"),
("F-Zero X","Carreras","1998-07-14","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BZTZlM2Y0MGYtODIxMy00ODI4LTk0MjEtZmIzOTRhYjVlNWMxXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Wave Race 64","Carreras","1996-11-01","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BMzkxM2VlZjUtN2ZjYy00ZjQxLWJhY2QtMzVkMjRmZTVmYzZmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Conker's Bad Fur Day","Aventura, Plataformas","2001-03-05","Nintendo 64","Rare","https://m.media-amazon.com/images/I/516T1VQFSJL.jpg"),
("Mario Party 2","Juegos de tablero","1999-12-17","Nintendo 64","Hudson Soft","https://m.media-amazon.com/images/M/MV5BOGZhMDgwYmEtOWFkMi00M2I5LWI0NjgtMDU4NzRmYTZmNDM4XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Mortal Kombat Trilogy","Lucha","1996-10-31","Nintendo 64","Midway Games","https://m.media-amazon.com/images/M/MV5BN2RiYjZmMDYtOGI3YS00M2Y1LTk1OGYtOTMyNmE5ZGUyOGIxXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
("Killer Instinct Gold","Lucha","1996-11-25","Nintendo 64","Rare","https://m.media-amazon.com/images/M/MV5BYjFhOTYzZDAtYTFkZS00MmVjLTkzMjgtNGM5MGY1MzhhN2I1XkEyXkFqcGdeQXVyMTEwNDU1MzEy._V1_.jpg"),
("Tony Hawk's Pro Skater","Deportes","2000-02-29","Nintendo 64","Neversoft","https://m.media-amazon.com/images/M/MV5BNDVkYjc5YmMtNDM4Ny00YzIwLWFlOTMtNDJjYzY4NzkzMDkwXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Paper Mario","RPG","2000-08-11","Nintendo 64","Intelligent Systems","https://m.media-amazon.com/images/M/MV5BODU0ODBmNTctYWFjNC00YTk2LWJmOTItNzhkOTA0Y2Y4NmNmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg"),
("Mario Tennis","Deportes","2000-07-21","Nintendo 64","Camelot Software Planning","https://m.media-amazon.com/images/M/MV5BYjQ3NmNkNmMtZGY5Yi00OGJlLTk0N2MtYTZkNzZkNjRmZTMwXkEyXkFqcGdeQXVyMTEwNDU1MzEy._V1_.jpg"),
("Kirby 64: The Crystal Shards","Plataformas","2000-03-24","Nintendo 64","HAL Laboratory","https://m.media-amazon.com/images/M/MV5BMGZmZTdkMDctMDdhNS00OWUzLTg4ODQtMmUzYjUzZmU5N2ZlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Mystical Ninja Starring Goemon","Aventura, Plataformas","1997-08-07","Nintendo 64","Konami","https://m.media-amazon.com/images/M/MV5BNDczYmY3YTItNTRjMy00N2ViLWE2YjAtNDQ1YTcyYmU3NGU2XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("1080° Snowboarding","Deportes","1998-02-28","Nintendo 64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BNWRkMjJmOTItMmFlMS00NTMxLWE5ZGQtYWNlOTM5MmQzMDhiXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg"),
("Bomberman 64","Estrategia","1997-12-20","Nintendo 64","Hudson Soft","https://m.media-amazon.com/images/M/MV5BZjg4N2U5MjAtOTg0NC00NTlkLTg3ZGQtYjI5YmJiZmZmODczXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_QL75_UY281_CR109,0,190,281_.jpg"),
("Turok: Dinosaur Hunter","Shooter en primera persona","1997-03-04","Nintendo 64","Iguana Entertainment","https://m.media-amazon.com/images/M/MV5BYjIxNTU3ZTgtN2Q2YS00ZTk4LTgwM2MtMWQ1YTM2ZjdjZjlmXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_FMjpg_UX1000_.jpg"),
("Pokemon Snap","Simulación","1999-03-21","Nintendo64","HAL Laboratory","https://m.media-amazon.com/images/M/MV5BNWYwZjZmOTctNzU5Ni00NjBlLThiNmUtZTYxN2JmOGYxNDdmXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_FMjpg_UX1000_.jpg"),
("Pokemon Stadium","Estrategia","2000-04-30","Nintendo64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BZmRmNmIzNzMtNzFhNy00MzQ0LTg3ODQtMWE0NThmOTg3ZjExXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_QL75_UY281_CR109,0,190,281_.jpg"),
("Pokemon Stadium 2","Estrategia","2000-12-14","Nintendo64","Nintendo EAD","https://m.media-amazon.com/images/M/MV5BY2MxODBkMTctYTAzOS00NjMwLWJiZjQtOTk0ZWYwZjg4ZGUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg"),
("Hey You, Pikachu!","Simulación","2000-12-12","Nintendo64","Nintendo","https://m.media-amazon.com/images/M/MV5BM2YyYTkyYWQtNmQ1MS00MDI1LThkYzYtMWZmNjE0MDliYjMwXkEyXkFqcGdeQXVyMTgwOTE5NDk@._V1_QL75_UY281_CR98,0,190,281_.jpg"),
("Pokemon Puzzle League","Puzzle","2000-09-25","Nintendo64","Nintendo Software Technology","https://m.media-amazon.com/images/M/MV5BOGU5MDRmODItNmM4Ny00MzNlLTljYmItODBlYzZhOWNlMDQ5XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_FMjpg_UX1000_.jpg");