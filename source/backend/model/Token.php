<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

use Firebase\JWT\JWT;

class Token
{
    public static function generarToken(Usuario $usuario): void
    {
        $payload = array(
            "iss" => "http://contentkingdom.alu6618.arkania.es/api/login.php",
            "aud" => "http://contentkingdom.alu6618.arkania.es/login",
            "iat" => time(),
            "user" => $usuario
        );
        $token = JWT::encode($payload, AUTHKEY, "HS256");
        echo $token;
    }
}
