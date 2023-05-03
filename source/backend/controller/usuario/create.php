<?php
require_once(__DIR__ . "../../../inc/bootstrap.php");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Request-Headers: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postdata = file_get_contents("php://input");
    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        $nombreUsuario = PDO::quote(trim($request->usuario));
        $newuser = new Usuario(null,$request->usuario,password_hash($request->passwd,PASSWORD_DEFAULT),$request->email);
        echo $newuser;
        if (trim($request->usuario) === '' || $request->passwd === '') {
            return http_response_code(400);
        }
        echo $request;
    }
}