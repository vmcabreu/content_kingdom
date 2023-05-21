<?php
class Comentario {
    private $atributos = ['idPublicacion' => null, 'idPublicacion' => null, 'comentario' => ""];
  
    public function __construct(int $idPublicacion = null,int $idUsuario=null,string $comentario = "") {
      $this->idPublicacion = $idPublicacion;
      $this->idUsuario = $idUsuario;
      $this->comentario = $comentario;
    }

    public function __set(string $atributo, mixed $valor)
    {
        $this->atributos[$atributo] = $valor;
    }

    public function __get(string $atributo)
    {
        return $this->atributos[$atributo];
    }

    public static function crearComentario(array $datos): Comentario
    {
        $objeto = new Comentario();
        foreach ($datos as $atributo => $valor) {
            $objeto->$atributo = $valor;
        }
        return $objeto;
    }
  }
  