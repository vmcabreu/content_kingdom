<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $usuario = Usuario::crearUsuario($data);
    $response = DAOUsuario::modificarUsuario($usuario);
    http_response_code($response > 0 ? 200 : 422);
}
