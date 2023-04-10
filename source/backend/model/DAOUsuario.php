<?php
require_once PROJECT_ROOT_PATH . "/model/BaseDAO.php";

class DAOUsuario extends BaseDAO
{
    /**
     * Comprueba si existe un usuario en la base de datos.
     * @param {string} nombre - El nombre del usuario.
     * @param {string} email - La dirección de correo electrónico del usuario.
     * @returns el número de filas que coinciden con la consulta.
     */
    public static function comprobarUsuario(string $nombre, string $email): bool|array
    {
        return BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$nombre' OR email='$email'");
    }



    /**
     * Devuelve verdadero si el usuario existe en la base de datos, falso en caso contrario
     * 
     * @param string nombre cadena
     * @param string passwd ' O 1=1 -- -
     * 
     * @return bool Un valor booleano.
     */
    public static function validLogUsuario(string $nombre, string $passwd): PDOStatement
    {
        return BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$nombre' OR passwd='$passwd'");
    }

    /**
     * Agrega un usuario a la base de datos.
     * @param {Usuario} usuario - El nombre de usuario
     * @returns un valor booleano.
     */
    public static function aniadirUsuario(Usuario $usuario): int
    {
        if (self::comprobarUsuario($usuario->usuario, $usuario->email)) {
            $sql = "INSERT INTO usuarios VALUES (null,'$usuario->usuario','$usuario->passwd',
            $usuario->email)";
            return BaseDAO::consulta($sql);
        } else {
            return false;
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
        email = $usuario->email  WHERE id = $usuario->id";
        return BaseDAO::consulta($sql);
    }

    /**
     * Devuelve un objeto de usuario si el usuario existe, o nulo si el usuario no existe
     * @param {int} id - El id del usuario que desea buscar.
     * @returns un objeto Usuario.
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

    public static function loginUsuario(string $nombre, string $passwd)
    {
        if (self::validLogUsuario($nombre, $passwd) != null) {
            $_SESSION['logged'] = [$nombre, $passwd, true];
        } else {
            $_SESSION['logged'] = [$nombre, $passwd, false];
        }
    }
}
