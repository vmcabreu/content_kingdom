<?php

class AmigosUsuario
{
    private $atributos = ['usuario_id' => null, 'amigo_id' => null,'fecha_amistad' => ""];

    public function __construct(int $usuario_id = null, int $amigo_id = null,string $fecha_amistad = "")
    {
        $this->usuario_id = $usuario_id;
        $this->amigo_id = $amigo_id;
        $this->fecha_amistad = $fecha_amistad;
    }

    public function __set(string $atributo, mixed $valor)
    {
        $this->atributos[$atributo] = $valor;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public static function crearAmigosUsuario(array $datos): AmigosUsuario
    {
        $objeto = new AmigosUsuario();
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
