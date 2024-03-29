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
            $platformUser = DAOPlataforma::getPlataformaFromUsuarios($id);
            if ($platformUser != null) {
                http_response_code(200);
                echo json_encode($platformUser);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró la plataforma del usuario con ID " . $id));
            }
        } else {
            $listPlataforma = DAOPlataforma::getListPlataforma();
            if ($listPlataforma != null) {
                http_response_code(200);
                echo json_encode($listPlataforma);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "No se encontró niguna plataforma"));
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_GET['listType']) && $_GET['listType'] == "list") {
            $json = file_get_contents('php://input');
            $array = json_decode($json, true);
            if (DAOPlataforma::addPlataformaList($array)) {
                http_response_code(200);
            } else {
                http_response_code(422);
            }
        } else {
            $json = file_get_contents('php://input');
            $array = json_decode($json, true);
            if (DAOPlataforma::addPlataforma(Plataforma::crearPlataforma($array))) {
                http_response_code(200);
            } else {
                http_response_code(422);
            }
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $respuestaDelete = DAOPlataforma::deletePlataforma($id);
            $httpCode = $respuestaDelete > 0 ? 200 : 422;
            echo json_encode(array("respuesta" => $respuestaDelete),JSON_UNESCAPED_UNICODE);
            http_response_code($httpCode);
            return;
        }
    }
}
