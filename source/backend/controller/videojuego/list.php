<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $listaJuegos = DAOVideojuego::listVideojuegos();
    if ($listaJuegos != null) {
        echo json_encode($listaJuegos);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error en base de datos"));
    }
    }

