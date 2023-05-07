<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $list = DAOPublicacion::listaPublicacion();
    if ($perfilById != null) {
        echo json_encode($perfilById, JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error con la base de datos"));
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
    if (DAOUsuario::validarLogin($passwd, $user)) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}
