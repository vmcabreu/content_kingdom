<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

class DAOPublicacion
{
    public static function getPublicacionById($id)
    {
        try {
            $stmt = BaseDAO::consulta("SELECT * FROM publicaciones WHERE id_usuario='$id' LIMIT 1");
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($conexion);
            if ($resultado) {
                return Publicacion::crearPublicacion($resultado);
            } else {
                return null;
            }
        } catch (Exception $ex) {
            die("Error en la consulta. " . $ex->getMessage());
        }
    }

    public static function getPublicacionByUsuario(int $id)
    {
            $stmt = BaseDAO::consulta("SELECT * FROM publicaciones WHERE id_usuario='$id'");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getPublicacionByVideojuego(int $id)
    {
            $stmt = BaseDAO::consulta("SELECT * FROM publicaciones WHERE id_videojuego='$id'");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getPublicacionByMegusta(int $limit = 10)
    {
        $stmt = BaseDAO::consulta("SELECT * FROM publicaciones ORDER BY megusta DESC LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function listaPublicacion(int $limit = 10000): ?array
    {
        $stmt = BaseDAO::consulta("SELECT * FROM publicaciones ORDER BY id DESC LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function aniadirPublicacion(Publicacion $post): int
    {
        $sql = "INSERT INTO publicaciones VALUES (null,'$post->id_usuario','$post->id_videojuego','$post->fecha','$post->megusta','$post->mensaje','$post->adjunto','$post->plataforma')";
        return BaseDAO::consulta($sql);
    }

    

    public static function borrarPublicacion(int $id): int
    {
        $sql = "DELETE FROM publicaciones WHERE id=$id";
        return BaseDAO::consulta($sql);
    }

    

}
