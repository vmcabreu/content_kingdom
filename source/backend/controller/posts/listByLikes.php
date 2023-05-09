<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $listMegusta = DAOPublicacion::getPublicacionByMegusta();
    if ($listMegusta != null) {
        echo json_encode($listMegusta, JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error con la base de datos"));
    }
}
