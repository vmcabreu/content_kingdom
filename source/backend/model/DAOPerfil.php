<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOPerfil
{
    public static function getPerfilById($id){
        try {
            $stmt = BaseDAO::consulta("SELECT * FROM perfil WHERE id_usuario='$id' LIMIT 1");
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($conexion);
            if ($resultado) {
                return Perfil::crearPerfil($resultado);
            } else {
                return null;
            }
        } catch (Exception $ex) {
            die("Error en la consulta. " . $ex->getMessage());
        }
    }
}