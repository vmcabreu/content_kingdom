<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $listEtiquetas = DAOEtiqueta::listEtiquetas();
        if ($listEtiquetas != null) {
            echo json_encode($listEtiquetas);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró el perfil de usuario con ID " . $id));
        }
}