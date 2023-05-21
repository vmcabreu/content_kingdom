<?php

class Likes
{
    private $atributos = ['id_usuario' => null, 'id_publicacion' => null];

    public function __construct(int $id_usuario = null, int $id_publicacion = null)
    {
        $this->id_usuario = $id_usuario;
        $this->id_publicacion = $id_publicacion;
    }

    public function __set(string $atributo, mixed $valor)
    {
        $this->atributos[$atributo] = $valor;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public static function crearLikes(array $datos): Likes
    {
        $objeto = new Likes();
        foreach ($datos as $atributo => $valor) {
            $objeto->$atributo = $valor;
        }
        return $objeto;
    }

    public function __toString()
    {
        return json_encode($this->atributos, JSON_UNESCAPED_UNICODE);
    }
}