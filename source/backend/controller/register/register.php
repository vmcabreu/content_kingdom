<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
        $user = $array['usuario'];
        $passwd = password_hash($array['passwd'],PASSWORD_DEFAULT);
        $email = $array['email'];
        $usuario= new Usuario(null,$user,$passwd,$email);
        $response = DAOUsuario::aniadirUsuario($usuario);
        if ($response > 0) {
            $insertedUsuario = DAOUsuario::buscarUsuarioUsuario($user);
            DAOPerfil::crearPerfilZero($insertedUsuario->id);
            http_response_code(200);
        }else{
            http_response_code(422);
        }
        
    
}