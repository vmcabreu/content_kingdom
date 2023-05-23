<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
    if (DAOPublicacion::aniadirPublicacion(Publicacion::crearPublicacion($array))) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}
