<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $juego = DAOVideojuego::getVideojuegoById($id);
        if ($juego != null) {
            echo json_encode($juego, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error con la base de datos"));
        }
        return;
    }

    $listaJuegos = DAOVideojuego::listVideojuegos();
    if ($listaJuegos != null) {
        echo json_encode($listaJuegos);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error en base de datos"));
    }
    }

