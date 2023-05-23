<?php

class Publicacion
    {
        private $atributos = ['id' => null, 'id_usuario' => null, 'id_videojuego' => null, 'fecha' => "", 'megusta' => 0, 'mensaje' => "",'adjunto' => "",'plataforma' => "",'etiqueta' => ""];

        public function __construct(int $id = null,int $id_usuario = null,int $id_videojuego = null, string $fecha = "", int $megusta = 0, string $mensaje = "", string $adjunto = "",string $plataforma = "",string $etiqueta = "",)
        {
            $this->id = $id;
            $this->id_usuario = $id_usuario;
            $this->id_videojuego = $id_videojuego;
            $this->fecha = $fecha;
            $this->megusta = $megusta;
            $this->mensaje = $mensaje;
            $this->adjunto = $adjunto;
            $this->plataforma = $plataforma;
            $this->etiqueta = $etiqueta;
        }

        public function __set(string $atributo, mixed $valor)
        {
            $this->atributos[$atributo] = $valor;
        }

        public function __get(string $atributo)
        {
            return $this->atributos[$atributo];
        }

        public static function crearPublicacion(array $datos): Publicacion
        {
            $objeto = new Publicacion();
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