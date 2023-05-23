<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $perfilById = DAOPerfil::getPerfilById($id, 1);
        if ($perfilById != null) {
            http_response_code(200);
            echo json_encode($perfilById);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró el perfil de usuario con ID " . $id));
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $perfil = Perfil::crearPerfil($data);
    $response = DAOPerfil::modificarPerfil($perfil);
    http_response_code($response > 0 ? 200 : 422);
}
