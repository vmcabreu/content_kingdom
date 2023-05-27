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
            $juego = DAOVideojuego::getVideojuegoById($id);
            if ($juego != null) {
                echo json_encode($juego, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        $listaJuegos = DAOVideojuego::listVideojuegos();
        if ($listaJuegos != null) {
            echo json_encode($listaJuegos);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error en base de datos"));
        }
    }
}
