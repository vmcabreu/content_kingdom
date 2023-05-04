<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        if (DAOUsuario::validarLogin($passwd,$user)) {
            $bdUser = DAOUsuario::loginGetUser($passwd,$user);
            Token::loginJWT($bdUser);
            http_response_code(200);
        }else{
            http_response_code(422);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        if (DAOUsuario::validarLogin($passwd,$user)) {
            $bdUser = DAOUsuario::loginGetUser($passwd,$user);
            $token = Token::getTokenUsuario($bdUser->id);
            header('Content-Type: application/json');
            echo json_encode(array( 'token' => $token));
        }else{
            http_response_code(422);
        }
    }
}