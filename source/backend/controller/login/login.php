<?php
require_once(__DIR__ . "/../../inc/bootstrap.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['passwd'])) {
        $user = $_POST['usuario'];
        $passwd = $_POST['passwd'];
        $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$user' LIMIT 1");
        if ($stmt->rowCount() > 0) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($passwd, $usuario["passwd"])) {
                ob_clean();
                $usertoken =  new Usuario($usuario['id'], $usuario['usuario'], $usuario['passwd'], $usuario['email']);
                echo http_response_code(204);
            } else {
                header('HTTP/1.0 401 Unauthorized');
            }
        }
    }
}
