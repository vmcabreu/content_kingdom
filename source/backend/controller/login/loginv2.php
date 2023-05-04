<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        if (DAOUsuario::validarLogin($passwd,$user)) {
            echo json_encode(Token::generarTokenLog(DAOUsuario::loginGetUser($passwd,$user)[0]));
        }else{
            http_response_code(422);
        }
    }
}
