<?php

class Videojuego
{
    private $atributos = ['id' => null, 'nombre' => "", 'genero' => "", 'fecha_lanzamiento' => "", 'plataforma' => "", 'desarrolladores' => ""];

    public function __construct(int $id = null,string $nombre = "",string $genero = "", string $fecha_lanzamiento = "", string $plataforma = "", string $desarrolladores = "")
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->genero = $genero;
        $this->fecha_lanzamiento = $fecha_lanzamiento;
        $this->plataforma = $plataforma;
        $this->desarrolladores = $desarrolladores;
    }

    public function __set(string $atributo, mixed $valor)
    {
        $this->atributos[$atributo] = $valor;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public static function crearPublicacion(array $datos): Videojuego
    {
        $objeto = new Videojuego();
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