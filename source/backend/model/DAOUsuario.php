<?php
require_once(__DIR__ . "/../inc/bootstrap.php");


class DAOUsuario
{

    public static function validarLogin(string $passwd, string $user){
        $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$user' LIMIT 1");
        if ($stmt->rowCount() > 0) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            return password_verify($passwd, $usuario["passwd"]);
        }
        return false;
    }

    public static function loginGetUser(string $passwd, string $user){
        $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$user' LIMIT 1");
        if ($stmt->rowCount() > 0) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($passwd, $usuario["passwd"])) {
                return new Usuario($usuario['id'], $usuario['usuario'], $usuario['passwd'], $usuario['email'],$usuario['token']);;
            }
        }
    }

    public static function comprobarUsuario(string $nombre, string $email): array
    {
        $stmt = BaseDAO::consulta("SELECT * FROM usuarios WHERE usuario='$nombre' OR email='$email'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


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


    public static function modificarUsuario(Usuario $usuario): int
    {
        $sql = "UPDATE usuarios SET usuario = '$usuario->usuario',passwd = '$usuario->passwd',
        email = '$usuario->email'  WHERE id = $usuario->id";
        return BaseDAO::consulta($sql);
    }


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

    public static function buscarUsuarioID(int $id)
    {

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
            die("Error en la consulta. " . $ex->getMessage());
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
}
