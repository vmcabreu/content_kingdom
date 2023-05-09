<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['listType'])) {
        if ($_GET['listType'] = "likes") {
            $listMegusta = DAOPublicacion::getPublicacionByMegusta();
            if ($listMegusta != null) {
                echo json_encode($listMegusta, JSON_UNESCAPED_UNICODE);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error con la base de datos"));
            }
        }
    } else {
        $list = DAOPublicacion::listaPublicacion();
        if ($list != null) {
            echo json_encode($list, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error con la base de datos"));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
    $publicacion = new Publicacion();
    $publicacion->id_usuario = $array['id_usuario'];
    $publicacion->id_videojuego = $array['id_videojuego'];
    $publicacion->fecha = $array['fecha'];
    $publicacion->megusta = $array['megusta'];
    $publicacion->mensaje = $array['mensaje'];
    $publicacion->adjunto = $array['adjunto'];
    $publicacion->plataforma = $array['plataforma'];
    $publicacion->etiqueta = $array['etiqueta'];
    $response = DAOPublicacion::aniadirPublicacion($publicacion);
    if ($response > 0) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}
