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
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        $array = json_decode($json, true);
        $comentario = Comentario::crearComentario($array);

        if (DAOComentario::aniadirComentario($comentario)) {
            http_response_code(200);
        } else {
            http_response_code(422);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['listType']) && $_GET['listType'] == "number") {
            $listNumComentario = DAOComentario::getNumComentarios();
            if ($listNumComentario) {
                echo json_encode($listNumComentario, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        if (isset($_GET['idUsuario'])) {
            $id = intval($_GET['idUsuario']);
            $listaFromUsuario = DAOComentario::getComentarioByUsuario($id);
            if ($listaFromUsuario) {
                echo json_encode($listaFromUsuario, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        if (isset($_GET['post'])) {
            $id = intval($_GET['post']);
            $listaFromPost = DAOComentario::getComentarioByPublicacion($id);
            if ($listaFromPost) {
                echo json_encode($listaFromPost, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        $list = DAOComentario::listaComentarios();
        if ($list) {
            echo json_encode($list, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error con la base de datos"));
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $respuestaDelete = DAOComentario::borrarComentario($id);
            http_response_code($respuestaDelete > 0 ? 200 : 422);
            echo json_encode(array("respuesta" => $respuestaDelete),JSON_UNESCAPED_UNICODE);
            return;
        }
    }
}
