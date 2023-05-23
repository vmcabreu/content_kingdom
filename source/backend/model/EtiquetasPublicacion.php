<?php

class EtiquetaPublicacion
{
    private $atributos = ['id_etiqueta' => null, 'id_publicacion' => null];

    public function __construct(int $id_etiqueta = null, int $id_publicacion = null)
    {
        $this->id_etiqueta = $id_etiqueta;
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

    public static function crearEtiquetaPublicacion(array $datos): EtiquetaPublicacion
    {
        $objeto = new EtiquetaPublicacion();
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
