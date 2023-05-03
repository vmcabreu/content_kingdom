<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        if (DAOUsuario::validarLogin($passwd,$user)) {
            echo DAOUsuario::validarLoginOk($passwd,$user);
        }else{
            header('HTTP/1.0 401 Unauthorized');
        }
    }
}
