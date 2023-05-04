<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        if (DAOUsuario::validarLogin($passwd, $user)) {
            $bdUser = DAOUsuario::loginGetUser($passwd, $user);
            Token::loginJWT($bdUser);
            http_response_code(200);
        } else {
            http_response_code(422);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $jsonInput = file_get_contents('php://input');
    $jsonObject = json_decode($jsonInput, true);
    $user = $jsonObject->username;
    $passwd = $jsonObject->passwd;
    if (DAOUsuario::validarLogin($passwd, $user)) {
        $bdUser = DAOUsuario::loginGetUser($passwd, $user);
        header('Content-Type: application/json');
        echo json_encode(array('token' => $bdUser->token));
    } else {
        http_response_code(422);
    }
}
