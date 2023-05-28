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
            $listTagPost = DAOEtiquetaPublicacion::getEtiquetaPostFromPost($id);
            if ($listTagPost != null) {
                http_response_code(200);
                echo json_encode($listTagPost);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró etiquetas de la publicacion con ID " . $id));
            }
        } elseif (isset($_GET['tag'])) {
            $tag = intval($_GET['tag']);
            $tagTags = DAOEtiquetaPublicacion::getEtiquetaPostFromEtiqueta($tag);
            if ($tagTags != null) {
                http_response_code(200);
                echo json_encode($tagTags);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró etiquetas con ID " . $tag));
            }
        } else {
            $listTags = DAOEtiquetaPublicacion::getListEtiquetaPost();
            if ($listTags != null) {
                http_response_code(200);
                echo json_encode($listTags);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró likes de las publicaciones"));
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_GET['listType']) && $_GET['listType'] == "list") {
            $json = file_get_contents('php://input');
            $array = json_decode($json, true);
            if (DAOEtiquetaPublicacion::addEtiquetaPublicacionList($array)) {
                http_response_code(200);
            } else {
                http_response_code(422);
            }
        } else {
            $json = file_get_contents('php://input');
            $array = json_decode($json, true);
            if (DAOEtiquetaPublicacion::addEtiqueta(EtiquetaPublicacion::crearEtiquetaPublicacion($array))) {
                http_response_code(200);
            } else {
                http_response_code(422);
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (isset($_GET['id']) && isset($_GET['post'])) {
            $id = intval($_GET['id']);
            $post = intval($_GET['post']);
            $respuestaDelete = DAOEtiquetaPublicacion::deleteEtiqueta($id, $post);
            $httpCode = $respuestaDelete > 0 ? 200 : 422;
            echo json_encode(array("respuesta" => $respuestaDelete),JSON_UNESCAPED_UNICODE);
            http_response_code($httpCode);
            return;
        }
    }
}
