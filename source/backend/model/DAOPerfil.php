<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOPerfil
{
    public static function getPerfilById($id)
    {
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


    public static function buscarPerfil(int $id, int $limite = 100, int $offset = 0): ?array
    {
        $respuesta = array();
        do {
            $resultado = BaseDAO::consulta("SELECT * FROM perfil WHERE id_usuario='$id' LIMIT $limite");
            $filas = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $respuesta = array_merge($respuesta, $filas);
            $offset += $limite;
        } while (!empty($filas));
        return empty($respuesta) ? null : $respuesta;
    }

    public static function modificarPerfil(Perfil $perfil): int
    {
        $sql = "UPDATE perfil SET canales = '$perfil->canales', profile_pic = '$perfil->profile_pic', biografica = '$perfil->biografica', profesion = '$perfil->profesion' WHERE id = $perfil->id";
        return BaseDAO::consulta($sql);
    }
}
