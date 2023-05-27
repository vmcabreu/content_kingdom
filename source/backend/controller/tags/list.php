<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
    $bearerToken = explode(' ', $headers['Authorization']);
    $token = $bearerToken[1];
    if (!$token || !Token::verifyToken($token)) {
        http_response_code(401);
        exit(json_encode(array("message" => "Acceso denegado")));
    }
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $listEtiquetas = DAOEtiqueta::listEtiquetas();
        if ($listEtiquetas != null) {
            echo json_encode($listEtiquetas,JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró el perfil de usuario con ID " . $id));
        }
    }
}
