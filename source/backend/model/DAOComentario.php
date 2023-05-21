<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

class DAOComentario
{
    public static function getComentarioByUsuario($id)
    {
        $stmt = BaseDAO::consulta("SELECT * FROM comentarios WHERE id_usuario='$id'");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getComentarioByPublicacion(int $id)
    {
        $stmt = BaseDAO::consulta("SELECT * FROM comentarios WHERE id_publicacion='$id'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public static function listaComentarios(int $limit = 10000): ?array
    {
        $stmt = BaseDAO::consulta("SELECT * FROM comentarios LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getNumComentarios(int $limit = 10000): ?array
    {
        $stmt = BaseDAO::consulta("SELECT id_publicacion,COUNT(*) AS numero_publicaciones FROM comentarios GROUP BY id_publicacion;");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public static function aniadirComentario(Comentario $post): int
    {
        $sql = "INSERT INTO comentarios VALUES ('$post->id_publicacion','$post->id_usuario','$post->comentario')";
        return BaseDAO::consulta($sql);
    }
}
