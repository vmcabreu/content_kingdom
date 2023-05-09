<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

class DAOPublicacion
{
    public static function getPublicacionById($id){
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

    public static function listaPublicacion(int $limit = 10000,): ?array
    {
        $stmt = BaseDAO::consulta("SELECT * FROM publicaciones LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function aniadirPublicacion(Publicacion $post): int
    {
        $newFecha = DateTime::createFromFormat('Y-m-d', $post->fecha);
        $insertFecha = $newFecha->format('Y-m-d');
        $sql = "INSERT INTO publicaciones VALUES (null,'$post->id_usuario','$post->id_videojuego','$insertFecha','$post->megusta','$post->mensaje','$post->adjunto','$post->plataforma','$post->etiqueta'";
        return BaseDAO::consulta($sql);
    }
}