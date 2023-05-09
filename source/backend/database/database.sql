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
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS videojuegos (
  id INT auto_increment,
  nombre varchar(100) NOT NULL,
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

CREATE TABLE IF NOT EXISTS publicaciones (
  id INT auto_increment,
  id_usuario INT NOT NULL,
  id_videojuego INT,
  fecha DATE NOT NULL,
  megusta INT NOT NULL,
  mensaje TEXT NOT NULL,
  adjunto varchar(255),
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

CREATE TABLE IF NOT EXISTS amigos_usuarios (
  usuario_id INT NOT NULL,
  amigo_id INT NOT NULL,
  fecha_amistad DATE NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (amigo_id) REFERENCES usuarios(id)
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


INSERT INTO videojuegos (nombre, genero, fecha_lanzamiento, plataforma, desarrolladores) VALUES
('The Legend of Zelda: Breath of the Wild', 'acción-aventura', '2017-03-03', 'Switch', 'Nintendo EPD'),
('Super Mario Odyssey', 'plataforma', '2017-10-27', 'Switch', 'Nintendo EPD'),
('Animal Crossing: New Horizons', 'simulación social', '2020-03-20', 'Switch', 'Nintendo EPD'),
('Splatoon 2', 'shooter en tercera persona', '2017-07-21', 'Switch', 'Nintendo EPD'),
('Mario Kart 8 Deluxe', 'carreras', '2017-04-28', 'Switch', 'Nintendo EPD'),
('Super Smash Bros. Ultimate', 'lucha', '2018-12-07', 'Switch', 'Bandai Namco Studios y Sora Ltd.'),
('Stardew Valley', 'simulación de granja', '2017-10-05', 'Switch', 'ConcernedApe y Sickhead Games'),
('Hades', 'roguelike', '2020-09-17', 'Switch', 'Supergiant Games'),
('Fire Emblem: Three Houses', 'estrategia', '2019-07-26', 'Switch', 'Intelligent Systems y Koei Tecmo'),
('Monster Hunter Rise', 'acción', '2021-03-26', 'Switch', 'Capcom'),
('The Elder Scrolls V: Skyrim', 'acción-RPG', '2017-11-17', 'Switch', 'Bethesda Game Studios'),
('Dark Souls Remastered', 'acción-RPG', '2018-10-19', 'Switch', 'FromSoftware'),
('Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition', 'RPG', '2019-09-27', 'Switch', 'Square Enix'),
('Xenoblade Chronicles 2', 'RPG', '2017-12-01', 'Switch', 'Monolith Soft'),
('Bayonetta 2', 'acción', '2018-02-16', 'Switch', 'PlatinumGames'),
('Diablo III: Eternal Collection', 'acción-RPG', '2018-11-02', 'Switch', 'Blizzard Entertainment'),
('The Witcher 3: Wild Hunt – Complete Edition', 'acción-RPG', '2019-10-15', 'Switch', 'CD Projekt Red'),
('Octopath Traveler', 'RPG', '2018-07-13', 'Switch', 'Square Enix y Acquire'),
('Minecraft', 'sandbox', '2017-05-11', 'Switch', 'Mojang Studios'),
('Overwatch: Legendary Edition', 'shooter en primera persona', '2019-10-15', 'Switch', 'Blizzard Entertainment'),
('Pokémon: Let´s Go, Pikachu!/Let´s Go, Eevee!', 'RPG', '2018-11-16', 'Switch', 'Game Freak'),
('Civilization VI', 'estrategia', '2018-11-16', 'Switch', 'Firaxis Games y Aspyr'),
('Dead Cells', 'roguelike', '2018-08-07', 'Switch', 'Motion Twin'),
('Cuphead', 'plataforma', '2019-04-18', 'Switch', 'StudioMDHR'),
('Undertale', 'RPG', '2018-09-18', 'Switch', 'Toby Fox'),
('Hollow Knight', 'metroidvania', '2018-06-12', 'Switch', 'Team Cherry'),
('Celeste', 'plataforma', '2018-01-25', 'Switch', 'Matt Makes Games'),
('Bastion', 'acción-RPG', '2018-09-13', 'Switch', 'Supergiant Games'),
('Transistor', 'acción-RPG', '2018-11-01', 'Switch', 'Supergiant Games'),
('Carrion', 'acción', '2020-07-23', 'Switch', 'Phobia Game Studio'),
('Enter the Gungeon', 'roguelike', '2017-12-14', 'Switch', 'Dodge Roll'),
('Ori and the Blind Forest: Definitive Edition', 'plataforma', '2019-09-27', 'Switch', 'Moon Studios'),
('Ori and the Will of the Wisps', 'plataforma', '2020-09-17', 'Switch', 'Moon Studios'),
('Katana ZERO', 'plataforma', '2019-04-18', 'Switch', 'Askiisoft'),
('Astral Chain', 'acción', '2019-08-30', 'Switch', 'PlatinumGames'),
('Ni no Kuni: Wrath of the White Witch', 'RPG', '2019-09-20', 'Switch', 'Level-5'),
('Mario + Rabbids Kingdom Battle', 'estrategia', '2017-08-29', 'Switch', 'Ubisoft'),
('The Messenger', 'plataforma', '2018-08-30', 'Switch', 'Sabotage Studio'),
('Hyrule Warriors: Age of Calamity', 'acción', '2020-11-20', 'Switch', 'Koei Tecmo y Omega Force'),
('Pikmin 3 Deluxe', 'estrategia', '2020-10-30', 'Switch', 'Nintendo EPD'),
('FIFA 21 Legacy Edition', 'deportes', '2020-10-09', 'Switch', 'EA Sports'),
('Mortal Kombat 11 Ultimate', 'lucha', '2020-11-17', 'Switch', 'NetherRealm Studios'),
('Pokémon Sword/Shield', 'RPG', '2019-11-15', 'Switch', 'Game Freak'),
('Bloodborne', 'Acción-RPG', '2015-03-24', 'PS4', 'FromSoftware'),
('The Witcher 3: Wild Hunt', 'RPG', '2015-05-19', 'PS4', 'CD Projekt Red'),
('Batman: Arkham Knight', 'Acción-Aventura', '2015-06-23', 'PS4', 'Rocksteady Studios'),
('Until Dawn', 'Aventura interactiva', '2015-08-25', 'PS4', 'Supermassive Games'),
('Metal Gear Solid V: The Phantom Pain', 'Acción-Aventura', '2015-09-01', 'PS4', 'Kojima Productions'),
('Assassin´s Creed Syndicate', 'Acción-Aventura', '2015-10-23', 'PS4', 'Ubisoft Quebec'),
('Fallout 4', 'RPG', '2015-11-10', 'PS4', 'Bethesda Game Studios'),
('Just Cause 3', 'Acción-Aventura', '2015-12-01', 'PS4', 'Avalanche Studios'),
('Uncharted: The Nathan Drake Collection', 'Acción-Aventura', '2015-10-07', 'PS4', 'Bluepoint Games'),
('Street Fighter V', 'Lucha', '2016-02-16', 'PS4', 'Capcom'),
('Firewatch', 'Aventura', '2016-02-09', 'PS4', 'Campo Santo'),
('Far Cry Primal', 'Acción-Aventura', '2016-02-23', 'PS4', 'Ubisoft Montreal'),
('The Division', 'Acción-RPG', '2016-03-08', 'PS4', 'Ubisoft Massive'),
('Dark Souls III', 'Acción-RPG', '2016-03-24', 'PS4', 'FromSoftware'),
('Ratchet & Clank', 'Plataformas', '2016-04-12', 'PS4', 'Insomniac Games'),
('Uncharted 4: A Thief´s End', 'Acción-Aventura', '2016-05-10', 'PS4', 'Naughty Dog'),
('Doom', 'Shooter', '2016-05-13', 'PS4', 'id Software'),
('Overwatch', 'Shooter', '2016-05-24', 'PS4', 'Blizzard Entertainment'),
('Mirror´s Edge Catalyst', 'Acción-Aventura', '2016-06-07', 'PS4', 'EA DICE'),
('Deus Ex: Mankind Divided', 'Acción-RPG', '2016-08-23', 'PS4', 'Eidos Montreal'),
('Titanfall 2', 'Shooter', '2016-10-28', 'PS4', 'Respawn Entertainment'),
('Dishonored 2', 'Acción-Aventura', '2016-11-11', 'PS4', 'Arkane Studios'),
('Final Fantasy XV', 'RPG', '2016-11-29', 'PS4', 'Square Enix'),
('The Last Guardian', 'Acción-Aventura', '2016-12-06', 'PS4', 'GenDesign'),
('Gravity Rush 2', 'Acción-Aventura', '2017-01-18', 'PS4', 'SCE Japan Studio'),
('For Honor', 'Acción-Aventura', '2017-02-14', 'PS4', 'Ubisoft Montreal'),
('Halo Wars 2', 'Estrategia', '2017-02-21', 'PS4', 'Creative Assembly'),
('Nier: Automata', 'Acción-RPG', '2017-02-23', 'PS4', 'PlatinumGames'),
('Horizon Zero Dawn', 'Acción-Aventura', '2017-02-28', 'PS4', 'Guerrilla Games'),
('Mass Effect: Andromeda', 'RPG', '2017-03-21', 'PS4', 'BioWare'),
('Persona 5', 'RPG', '2017-04-04', 'PS4', 'Atlus'),
('Little Nightmares', 'Aventura', '2017-04-28', 'PS4', 'Tarsier Studios'),
('Prey', 'Shooter', '2017-05-05', 'PS4', 'Arkane Studios'),
('Injustice 2', 'Lucha', '2017-05-16', 'PS4', 'NetherRealm Studios'),
('Tekken 7', 'Lucha', '2017-06-02', 'PS4', 'Bandai Namco Studios'),
('Get Even', 'Shooter', '2017-06-23', 'PS4', 'The Farm 51'),
('Pyre', 'Acción-Aventura', '2017-07-25', 'PS4', 'Supergiant Games'),
('Uncharted: The Lost Legacy', 'Acción-Aventura', '2017-08-22', 'PS4', 'Naughty Dog'),
('Yakuza Kiwami', 'Acción-Aventura', '2017-08-29', 'PS4', 'Sega'),
('Danganronpa V3: Killing Harmony', 'Aventura', '2017-09-26', 'PS4', 'Spike Chunsoft'),
('Cuphead', 'Run and gun', '2017-09-29', 'PS4', 'StudioMDHR'),
('Middle-earth: Shadow of War', 'Acción-Aventura', '2017-10-10', 'PS4', 'Monolith Productions'),
('The Evil Within 2', 'Survival horror', '2017-10-13', 'PS4', 'Tango Gameworks'),
('Gran Turismo Sport', 'Simulación de carreras', '2017-10-17', 'PS4', 'Polyphony Digital'),
('South Park: The Fractured But Whole', 'RPG', '2017-10-17', 'PS4', 'Ubisoft San Francisco'),
('Assassin´s Creed Origins', 'Acción-Aventura', '2017-10-27', 'PS4', 'Ubisoft Montreal'),
('Call of Duty: WWII', 'Shooter', '2017-11-03', 'PS4', 'Sledgehammer Games'),
('Star Wars Battlefront II', 'Shooter', '2017-11-17', 'PS4', 'EA DICE'),
('Dead Rising 4','Survival horror','2017-12-05','PS4','Capcom Vancouver'),
('Okami HD','Acción-Aventura','2017-12-12','PS4','Clover Studio'),
('Street Fighter V: Arcade Edition','Lucha','2018-01-16','PS4','Capcom'),
('Monster Hunter: World','Acción-RPG','2018-01-26','PS4','Capcom'),
('Shadow of the Colossus','Acción-Aventura','2018-02-06','PS4','Bluepoint Games'),
('Dragon Ball FighterZ','Lucha','2018-01-26','PS4','Arc System Works'),
('Kingdom Come: Deliverance','RPG','2018-02-13','PS4','Warhorse Studios'),
('Fe','Acción-Aventura','2018-02-16','PS4','Zoink'),
('Metal Gear Survive','Acción-Aventura','2018-02-20','PS4','Konami'),
('Ni no Kuni II: Revenant Kingdom','RPG','2018-03-23','PS4','Level-5'),
('Far Cry 5','Shooter','2018-03-27','PS4','Ubisoft Montreal'),
('God of War','Acción-Aventura','2018-04-20','PS4','SIE Santa Monica Studio'),
('Frostpunk','Estrategia','2018-04-24','PS4','11 bit studios'),
('Dark Souls Remastered','Acción-RPG','2018-05-25','PS4','FromSoftware'),
('Jurassic World Evolution','Simulación de gestión','2018-06-12','PS4','Frontier Developments'),
('The Crew 2','Racing','2018-06-29','PS4','Ivory Tower'),
('The Banner Saga 3','RPG táctico','2018-07-24','PS4','Stoic Studio'),
('Yakuza 0','Acción-Aventura','2018-08-01','PS4','Sega'),
('Monster Hunter Generations Ultimate','Acción-RPG','2018-08-28','PS4','Capcom'),
('Marvel´s Spider-Man','Acción-Aventura','2018-09-07','PS4','Insomniac Games'),
('Shadow of the Tomb Raider','Acción-Aventura','2018-09-14','PS4','Eidos Montréal'),
('Red Dead Redemption 2','Acción-Aventura','2018-10-26','PS4','Rockstar Studios'),
('Fallout 76','RPG','2018-11-14','PS4','Bethesda Game Studios'),
('Just Cause 4','Acción-Aventura','2018-12-04','PS4','Avalanche Studios'),
('Kingdom Hearts III','RPG','2019-01-29','PS4','Square Enix'),
('Anthem','Shooter','2019-02-22','PS4','BioWare'),
('Devil May Cry 5','Acción','2019-03-08','PS4','Capcom'),
('Sekiro: Shadows Die Twice','Acción-Aventura','2019-03-22','PS4','FromSoftware'),
('The Division 2','Shooter','2019-03-15','PS4','Massive Entertainment'),
('Days Gone','Acción-Aventura','2019-04-26','PS4','SIE Bend Studio'),
('Rage 2','Shooter','2019-05-14','PS4','Avalanche Studios'),
('Team Sonic Racing','Carreras','2019-05-21','PS4','Sumo Digital'),
('Crash Team Racing Nitro-Fueled','Carreras','2019-06-21','PS4','Beenox'),
('Judgment','Acción-Aventura','2019-06-25','PS4','Ryu ga Gotoku Studio'),
('Bloodstained: Ritual of the Night','Acción-Aventura','2019-06-18','PS4','ArtPlay'),
('Fire Emblem: Three Houses','RPG táctico','2019-07-26','PS4','Intelligent Systems'),
('Wolfenstein: Youngblood','Shooter','2019-07-26','PS4','MachineGames'),
('Madden NFL 20','Deportes','2019-08-02','PS4','EA Tiburon'),
('Control','Acción-Aventura','2019-08-27','PS4','Remedy Entertainment'),
('Borderlands 3','Shooter','2019-09-13','PS4','Gearbox Software'),
('GreedFall','RPG','2019-09-10','PS4','Spiders'),
('FIFA 20','Deportes','2019-09-27','PS4','EA Sports'),
('Call of Duty: Modern Warfare','Shooter','2019-10-25','PS4','Infinity Ward'),
('Death Stranding','Acción-Aventura','2019-11-08','PS4','Kojima Productions'),
('Star Wars Jedi: Fallen Order','Acción-Aventura','2019-11-15','PS4','Respawn Entertainment'),
('Darksiders Genesis','Acción-Aventura','2019-12-05','PS4','Airship Syndicate'),
('The Outer Worlds','RPG','2019-10-25','PS4','Obsidian Entertainment'),
('Resident Evil 2 Remake','Survival horror','2019-01-25','PS4','Capcom'),
('Resident Evil 3 Remake','Survival horror','2020-04-03','PS4','Capcom'),
('Final Fantasy VII Remake','RPG','2020-04-10','PS4','Square Enix'),
('MotoGP 20','Deportes','2020-04-23','PS4','Milestone S.r.l.'),
('Predator: Hunting Grounds','Shooter','2020-04-24','PS4','IllFonic'),
('Minecraft Dungeons','RPG','2020-05-26','PS4','Mojang Studios'),
('The Last of Us Part II', 'Acción-Aventura', '2020-06-19', 'PS4', 'Naughty Dog'),
('Ghosts of Tsushima', 'Acción-Aventura', '2020-07-17', 'PS4', 'Sucker Punch Productions'),
('Destroy All Humans!', 'Acción-Aventura', '2020-07-28', 'PS4', 'Black Forest Games'),
('Fall Guys: Ultimate Knockout', 'Battle royale', '2020-08-04', 'PS4', 'Mediatonic'),
("Super Mario 64","Plataformas","1996-06-23","Nintendo 64","Nintendo EAD"),
("The Legend of Zelda: Ocarina of Time","Acción-Aventura","1998-11-21","Nintendo 64","Nintendo EAD"),
("GoldenEye 007","Shooter en primera persona","1997-08-25","Nintendo 64","Rare"),
("Mario Kart 64","Carreras","1996-12-14","Nintendo 64","Nintendo EAD"),
("Banjo-Kazooie","Plataformas","1998-06-29","Nintendo 64","Rare"),
("Diddy Kong Racing","Carreras","1997-11-21","Nintendo 64","Rare"),
("Star Fox 64","Simulador de vuelo, Shooter en tercera persona","1997-04-27","Nintendo 64","Nintendo EAD"),
("Perfect Dark","Shooter en primera persona","2000-05-22","Nintendo 64","Rare"),
("Donkey Kong 64","Plataformas, Aventura","1999-11-22","Nintendo 64","Rare"),
("F-Zero X","Carreras","1998-07-14","Nintendo 64","Nintendo EAD"),
("Wave Race 64","Carreras","1996-11-01","Nintendo 64","Nintendo EAD"),
("Conker's Bad Fur Day","Aventura, Plataformas","2001-03-05","Nintendo 64","Rare"),
("Mario Party 2","Juegos de tablero","1999-12-17","Nintendo 64","Hudson Soft"),
("Mortal Kombat Trilogy","Lucha","1996-10-31","Nintendo 64","Midway Games"),
("Killer Instinct Gold","Lucha","1996-11-25","Nintendo 64","Rare"),
("Tony Hawk's Pro Skater","Deportes","2000-02-29","Nintendo 64","Neversoft"),
("Paper Mario","RPG","2000-08-11","Nintendo 64","Intelligent Systems"),
("Mario Tennis","Deportes","2000-07-21","Nintendo 64","Camelot Software Planning"),
("Kirby 64: The Crystal Shards","Plataformas","2000-03-24","Nintendo 64","HAL Laboratory"),
("Mystical Ninja Starring Goemon","Aventura, Plataformas","1997-08-07","Nintendo 64","Konami"),
("1080° Snowboarding","Deportes","1998-02-28","Nintendo 64","Nintendo EAD"),
("Bomberman 64","Estrategia","1997-12-20","Nintendo 64","Hudson Soft"),
("Turok: Dinosaur Hunter","Shooter en primera persona","1997-03-04","Nintendo 64","Iguana Entertainment"),
("Pokemon Snap","Simulación","1999-03-21","Nintendo64","HAL Laboratory"),
("Pokemon Stadium","Estrategia","2000-04-30","Nintendo64","Nintendo EAD"),
("Pokemon Stadium 2","Estrategia","2000-12-14","Nintendo64","Nintendo EAD"),
("Hey You, Pikachu!","Simulación","2000-12-12","Nintendo64","Nintendo"),
("Pokemon Puzzle League","Puzzle","2000-09-25","Nintendo64","Nintendo Software Technology");