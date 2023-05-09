<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $usuarioById = DAOUsuario::buscarUsuarioID($id);
        if ($usuarioById != null) {
            echo json_encode($usuarioById);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No se encontró el usuario con ID " . $id));
        }
    }else if(isset($_GET['list'])) {
        $param = $_GET['list'];
        if($param = "new"){
            $listaNewUsuarios = DAOUsuario::getNuevosUsuarios();
            if ($listaNewUsuarios != null) {
                echo json_encode($listaNewUsuarios);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Error en base de datos"));
            }

        }
    }else{
        $listaUsuarios = DAOUsuario::getListaUsuarios();
        if ($listaUsuarios != null) {
            echo json_encode($listaUsuarios);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Error en base de datos"));
        }
    }
}
