<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        $usuario = DAOUsuario::validLogUsuario($user,$passwd);
        if ($usuario != null && password_verify($passwd,$usuario->passwd)) {
            header('Content-Type: application/json');
            echo json_encode(array("token" => Token::generarTokenLog($usuario))); 
          } else {
            header('HTTP/1.0 401 Unauthorized');
          }
    }
}