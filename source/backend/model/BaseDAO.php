<?php
class BaseDAO
{
    private static $lastAffectedRows;
    protected $connection = null;

    /**
     * Crea una nueva conexión a la base de datos usando las credenciales definidas en el archivo
     * `config.php`
     */
    public function __construct()
    {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);

            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Toma una consulta y una matriz de parámetros, ejecuta la consulta y devuelve el resultado
     * 
     * @param query La consulta a ejecutar.
     * @param params 
     * 
     * @return bool|mysqli_result Una matriz de matrices asociativas.
     */
    public function consulta($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    /**
     * Esta función toma una consulta y una matriz de parámetros y devuelve un objeto de declaración
     * 
     * @param query La consulta a ejecutar.
     * @param params 
     * 
     * @return El resultado de la consulta.
     */
    private function executeStatement($query = "", $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);
            if ($stmt === false) {
                throw new Exception("No se puede realizar la consulta: " . $query);
            }
            if ($params) {
                $stmt->bind_param($params[0], $params[1]);
            }
            $stmt->execute();
            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Devuelve el número de filas afectadas por la última consulta
     * 
     * @return int El número de filas afectadas por la última instrucción SQL.
     */
    public static function getLastAffectedRows()
    {
        return self::$lastAffectedRows;
    }
}
