<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
    $bearerToken = explode(' ', $headers['Authorization']);
    $token = $bearerToken[1];
    if (!$token || !Token::verifyToken($token)) {
        http_response_code(401);
        exit(json_encode(array("message" => "Acceso denegado")));
    }
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $usuarioById = DAOUsuario::buscarUsuarioID($id);
            if ($usuarioById != null) {
                echo json_encode($usuarioById,JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró el usuario con ID " . $id));
            }
        } else if (isset($_GET['list'])) {
            $param = $_GET['list'];
            if ($param == "new") {
                $listaNewUsuarios = DAOUsuario::getNuevosUsuarios();
                if ($listaNewUsuarios != null) {
                    echo json_encode($listaNewUsuarios,JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "Error en base de datos"));
                }
            }
        } else if (isset($_GET['user'])) {
            $param = $_GET['user'];
            $usuarios = DAOUsuario::buscarUsuarioUsuario($param);
            if ($usuarios != null) {
                echo json_encode($usuarios);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error en base de datos"));
            }
        } else {
            $listaUsuarios = DAOUsuario::getListaUsuarios();
            if ($listaUsuarios != null) {
                echo json_encode($listaUsuarios,JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error en base de datos"));
            }
        }
    }
}
