<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOLikes
{
    public static function getListOfLikes(int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM megusta LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getLikesFromUsuarios(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM megusta WHERE id_usuario='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getLikesFromPublicacion(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM megusta WHERE id_publicacion='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addLike(Likes $like): int
    {
        $sql = "INSERT INTO megusta VALUES ('$like->id_publicacion','$like->id_usuario')";
        return BaseDAO::consulta($sql);
    }

    public static function deleteLike(int $id, int $post): int
    {
        $sql = "DELETE FROM megusta WHERE id_publicacion='$post' AND id_usuario='$id'";
        return BaseDAO::consulta($sql);
    }
}
