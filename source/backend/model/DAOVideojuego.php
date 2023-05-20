<?php
require_once(__DIR__ . "/../inc/bootstrap.php");

class DAOVideojuego{
    public static function listVideojuegos(int $limit=10000){
        $stmt = BaseDAO::consulta(" SELECT * FROM videojuegos ORDER BY nombre LIMIT $limit");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}