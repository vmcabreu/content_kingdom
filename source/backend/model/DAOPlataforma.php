<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOPlataforma
{
    public static function getListPlataforma(int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM plataforma LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getPlataformaFromUsuarios(int $id, int $limit = 10000)
    {
        $stmt = BaseDAO::consulta(" SELECT * FROM plataforma WHERE id_usuario='$id' LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



    public static function addPlataforma(Plataforma $plataforma): int
    {
        $sql = "INSERT INTO plataforma VALUES (null,'$plataforma->nombre','$plataforma->enlace','$plataforma->id_usuario')";
        return BaseDAO::consulta($sql);
    }


    public static function addPlataformaList(array $plataformas): int
    {
        $values = [];
        foreach ($plataformas as $plataforma) {
            $nombre = $plataforma->nombre;
            $enlace = $plataforma->enlace;
            $id_usuario = $plataforma->id_usuario;
            $values[] = "(null,'$nombre','$enlace','$id_usuario')";
        }
        $sql = "INSERT INTO plataforma VALUES " . implode(',', $values);
        return BaseDAO::consulta($sql);
    }

    public static function deletePlataforma(int $id): int
    {
        $sql = "DELETE FROM plataforma WHERE id='$id'";
        return BaseDAO::consulta($sql);
    }
}
