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
        if (isset($_GET['listType']) && $_GET['listType'] == "likes") {
            $listMegusta = DAOPublicacion::getPublicacionByMegusta();
            if ($listMegusta) {
                echo json_encode($listMegusta, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        } elseif ((isset($_GET['listType']) && $_GET['listType'] == "likesUser") && isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $listMegustaUsuario = DAOPublicacion::listaPostMeGustaByUser($id);
            if ($listMegustaUsuario) {
                echo json_encode($listMegustaUsuario, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        if (isset($_GET['idUsuario'])) {
            $id = intval($_GET['idUsuario']);
            $listaFromUsuario = DAOPublicacion::getPublicacionByUsuario($id);
            if ($listaFromUsuario) {
                echo json_encode($listaFromUsuario, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        if (isset($_GET['idJuego'])) {
            $id = intval($_GET['idJuego']);
            $listaFromJuego = DAOPublicacion::getPublicacionByVideojuego($id);
            if ($listaFromJuego) {
                echo json_encode($listaFromJuego, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
            return;
        }

        $list = DAOPublicacion::listaPublicacion();
        if ($list) {
            echo json_encode($list, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error con la base de datos"));
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $publicacion = Publicacion::crearPublicacion($data);
        $response = DAOPublicacion::aniadirPublicacion($publicacion);
        http_response_code($response > 0 ? 200 : 422);
        echo json_encode(array("respuesta" => $respuestaDelete));
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $respuestaDelete = DAOPublicacion::borrarPublicacion($id);
            http_response_code($respuestaDelete > 0 ? 200 : 422);
            echo json_encode(array("respuesta" => $respuestaDelete));
            return;
        }
    }
}
