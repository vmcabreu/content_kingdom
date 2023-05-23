<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOEtiqueta
{
    public static function listEtiquetas(int $limit=10000){
        $stmt = BaseDAO::consulta(" SELECT * FROM etiquetas LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
