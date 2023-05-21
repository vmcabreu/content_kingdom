<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
require_once PROJECT_ROOT_PATH . "/inc/config.php";
require_once PROJECT_ROOT_PATH . "/inc/cors.php";
require_once PROJECT_ROOT_PATH . "/model/BaseDAO.php";
require_once PROJECT_ROOT_PATH . "/model/DAOUsuario.php";
require_once PROJECT_ROOT_PATH . "/model/DAOPerfil.php";
require_once PROJECT_ROOT_PATH . "/model/DAOPublicacion.php";
require_once PROJECT_ROOT_PATH . "/model/DAOVideojuego.php";
require_once PROJECT_ROOT_PATH . "/model/DAOComentario.php";
require_once PROJECT_ROOT_PATH . "/model/Token.php";
require_once PROJECT_ROOT_PATH . "/model/Usuario.php";
require_once PROJECT_ROOT_PATH . "/model/Comentario.php";
require_once PROJECT_ROOT_PATH . "/model/Perfil.php";
require_once PROJECT_ROOT_PATH . "/model/Publicacion.php";
require_once PROJECT_ROOT_PATH . "/model/Videojuego.php";
require_once PROJECT_ROOT_PATH . "/vendor/autoload.php";