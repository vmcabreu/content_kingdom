<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $amigosUsuario = DAOAmigosUsuario::getAmigosFromUsuarios($id);
        if ($amigosUsuario != null) {
            http_response_code(200);
            echo json_encode($amigosUsuario);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró amigos del usuario con ID " . $id));
        }
    } elseif (isset($_GET['friend'])) {
        $friend = intval($_GET['friend']);
        $amigosAmigo = DAOAmigosUsuario::getAmigosFromAmigo($friend);
        if ($amigosAmigo != null) {
            http_response_code(200);
            echo json_encode($amigosAmigo);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró usuarios del amigo con ID " . $post));
        }
    } else {
        $listFriends = DAOAmigosUsuario::getAmigosUsuario();
        if ($listFriends != null) {
            http_response_code(200);
            echo json_encode($listFriends);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró la lista de amigos"));
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
    if (DAOAmigosUsuario::addAmigo(AmigosUsuario::crearAmigosUsuario($array))) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (isset($_GET['id']) && isset($_GET['friend'])) {
        $id = intval($_GET['id']);
        $friend = intval($_GET['friend']);
        $respuestaDelete = DAOAmigosUsuario::deleteAmigo($id, $friend);
        $httpCode = $respuestaDelete > 0 ? 200 : 422;
        echo json_encode(array("respuesta" => $respuestaDelete));
        http_response_code($httpCode);
        return;
    }
}
