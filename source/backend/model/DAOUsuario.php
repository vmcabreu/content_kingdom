<?php
require_once PROJECT_ROOT_PATH . "/model/BaseDAO.php";
require_once __DIR__ . "/Token.php";

class DAOUsuario extends BaseDAO
{
    /**
     * Comprueba si existe un usuario en la base de datos.
     * @param {string} nombre - El nombre del usuario.
     * @param {string} email - La dirección de correo electrónico del usuario.
     * @returns el número de filas que coinciden con la consulta.
     */
    public static function comprobarUsuario(string $nombre, string $email): array
    {
            $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$nombre' OR email='$email'");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }



    /**
     * Devuelve verdadero si el usuario existe en la base de datos, falso en caso contrario
     * 
     * @param string nombre cadena
     * @param string passwd ' O 1=1 -- -
     * 
     * @return bool Un valor booleano.
     */
    public static function validLogUsuario(string $nombre, string $passwd): bool
    {
        $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$nombre' AND passwd='$passwd'");
        return $stmt->rowCount() > 0;
    }

    /**
     * Agrega un usuario a la base de datos.
     * @param {Usuario} usuario - El nombre de usuario
     * @returns un valor booleano.
     */
    public static function aniadirUsuario(Usuario $usuario): int
    {
        $resultado = self::comprobarUsuario($usuario->usuario, $usuario->email);
        if (count($resultado) > 0) {
            return false;
        } else {
            $sql = "INSERT INTO usuarios VALUES (null,'$usuario->usuario','$usuario->passwd',
            '$usuario->email')";
            return BaseDAO::consulta($sql);
        }
    }

    /**
     * Actualiza los datos del usuario en la base de datos.
     * @param {Usuario} usuario - El nombre de usuario
     * @returns Un valor booleano.
     */
    public static function modificarUsuario(Usuario $usuario): int
    {
        $sql = "UPDATE usuarios SET usuario = '$usuario->usuario',passwd = '$usuario->passwd',
        email = '$usuario->email'  WHERE id = $usuario->id";
        return BaseDAO::consulta($sql);
    }

    /**
     * Esta función busca un usuario en una tabla de base de datos por su ID, con límites y
     * compensaciones opcionales para la cantidad de resultados devueltos.
     * 
     * @param int id El ID del usuario a buscar en la base de datos.
     * @param int limite El parámetro "limite" es un parámetro entero opcional que especifica el número
     * máximo de filas que devolverá la consulta SQL. El valor predeterminado es 100 si no se
     * proporciona ningún valor.
     * @param int offset El parámetro de compensación se utiliza para especificar el punto de inicio
     * del conjunto de resultados. Determina el número de filas a omitir antes de comenzar a devolver
     * el conjunto de resultados. En esta función, se usa para paginar los resultados obteniendo un
     * cierto número de filas a la vez.
     * 
     * @return ?array una matriz de datos de usuario que coincide con la ID dada, con un límite de
     * resultados y una compensación para la paginación. Si no se encuentran resultados, devuelve nulo.
     */
    public static function buscarUsuario(int $id, int $limite = 100, int $offset = 0): ?array
    {
        $respuesta = array();
        do {
            $resultado = BaseDAO::consulta("SELECT * FROM usuarios WHERE id='$id' LIMIT $limite OFFSET $offset");
            $filas = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $respuesta = array_merge($respuesta, $filas);
            $offset += $limite;
        } while (!empty($filas));
        return empty($respuesta) ? null : $respuesta;
    }

    public static function buscarUsuarioID(int $id){

        try {
            $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE id='$id' LIMIT 1");
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($conexion);
            if ($resultado) {
                return Usuario::crearUsuario($resultado);
            } else {
                return null;
            }
        } catch (Exception $ex) {
            die("Error en la consulta. ".$ex->getMessage());
        }
    }

    /**
     * Elimina un usuario de la base de datos.
     * @param {int} id - El id del usuario a eliminar.
     * @returns Un valor booleano.
     */
    public static function borrarUsuario(int $id): int
    {
        $sql = "DELETE FROM usuarios WHERE id = '$id'";
        return BaseDAO::consulta($sql);
    }

    public static function loginUsuario(int $id, string $nombre, string $passwd)
    {
        if (self::validLogUsuario($nombre, $passwd) != null) {
            Token::generarToken(self::buscarUsuarioID($id));
        } else {

        }
    }
}
