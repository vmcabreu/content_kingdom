<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

use Firebase\JWT\JWT;

class Token
{
    public static function generarTokenLog(Usuario $usuario): string
    {
        $payload = array(
            "iss" => "http://contentkingdom.alu6618.arkania.es/api/controller/login/login.php",
            "aud" => "http://contentkingdom.alu6618.arkania.es/login",
            "iat" => time(), 
            "id" => $usuario->id,
            "nombre" => $usuario->usuario,
            "email" => $usuario->email
        );
        return JWT::encode($payload, AUTHKEY, "HS256");
    }
}
