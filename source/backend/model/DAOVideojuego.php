<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

class DAOVideojuego{
    public static function listVideojuegos(int $limit=1000){
        $stmt = BaseDAO::consulta(" SELECT * FROM videojuegos LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}