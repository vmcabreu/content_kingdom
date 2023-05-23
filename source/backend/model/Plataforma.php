<?php

class Plataforma
{
    private $atributos = ['id' => null, 'nombre' => "",'enlace' => "",'id_usuario' => null];

    public function __construct(int $id = null, string $nombre = "",string $enlace="" ,int $id_usuario = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->enlace = $enlace;
        $this->id_usuario = $id_usuario;
    }

    public function __set(string $atributo, mixed $valor)
    {
        $this->atributos[$atributo] = $valor;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public static function crearPlataforma(array $datos): Plataforma
    {
        $objeto = new Plataforma();
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
