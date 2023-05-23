<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOAmigosUsuario
{
    public static function getAmigosUsuario(int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM amigos_usuarios LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getAmigosFromUsuarios(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM amigos_usuarios WHERE usuario_id='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getAmigosFromAmigo(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM amigos_usuarios WHERE amigo_id='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addAmigo(AmigosUsuario $amigosUsuario): int
    {
        $sql = "INSERT INTO amigos_usuarios VALUES ('$amigosUsuario->id_usuario','$amigosUsuario->amigo_id','$amigosUsuario->fecha_amistad')";
        return BaseDAO::consulta($sql);
    }

    public static function deleteAmigo(int $id, int $friend): int
    {
        $sql = "DELETE FROM amigos_usuarios WHERE usuario_id='$id' AND amigo_id='$friend'";
        return BaseDAO::consulta($sql);
    }
}
