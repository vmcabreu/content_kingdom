<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOPerfil
{
    public static function getPerfilById($id)
    {
        $stmt = BaseDAO::consulta("SELECT * FROM perfil WHERE id_usuario='$id' LIMIT 1");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public static function listaPerfil(int $limite = 100): ?array
    {
        $stmt = BaseDAO::consulta("SELECT * FROM perfil LIMIT $limite");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function modificarPerfil(Perfil $perfil): int
    {
        $sql = "UPDATE perfil SET canales = '$perfil->canales', profile_pic = '$perfil->profile_pic', biografica = '$perfil->biografica', profesion = '$perfil->profesion' WHERE id = $perfil->id";
        return BaseDAO::consulta($sql);
    }
}
