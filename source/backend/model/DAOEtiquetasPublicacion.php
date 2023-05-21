<?php
require_once(__DIR__ . "/../inc/bootstrap.php");
class DAOEtiquetaPublicacion
{
    public static function getListEtiquetaPost(int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM etiquetasPublicacion LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getEtiquetaPostFromEtiqueta(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM etiquetasPublicacion WHERE id_etiqueta='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getEtiquetaPostFromPost(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta("SELECT etiquetas.nombre FROM etiquetasPublicacion INNER JOIN etiquetas ON etiquetasPublicacion.id_etiqueta = etiquetas.id WHERE etiquetasPublicacion.id_publicacion = '$id'
        LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function addEtiqueta(EtiquetaPublicacion $tagPost): int
    {
        $sql = "INSERT INTO etiquetasPublicacion VALUES ('$tagPost->id_etiqueta','$tagPost->id_publicacion')";
        return BaseDAO::consulta($sql);
    }

    public static function addEtiquetaPublicacionList(array $tagPost): int
    {
        $values = [];
        foreach ($tagPost as $tag) {
            $id_etiqueta = $tag['id_etiqueta'];
            $id_publicacion = $tag['id_publicacion'];
            $values[] = "('$id_etiqueta','$id_publicacion')";
        }
        $sql = "INSERT INTO etiquetasPublicacion VALUES " . implode(',', $values);
        return BaseDAO::consulta($sql);
    }

    public static function deleteEtiqueta(int $id, int $post): int
    {
        $sql = "DELETE FROM etiquetasPublicacion WHERE id_etiqueta='$id' AND id_publicacion='$post'";
        return BaseDAO::consulta($sql);
    }
}
