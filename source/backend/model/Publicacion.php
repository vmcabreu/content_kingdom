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

            $nombreArchivo = $_FILES['img']['name'];
            $rutaTemporal = $_FILES['img']['tmp_name'];
            $rutaDestino = '/home/victor/proyecto_final/server/' . $nombreArchivo;
            move_uploaded_file($rutaTemporal, $rutaDestino);
            $objeto->adjunto = $rutaDestino;

            $objeto->id = $datos['id'];
            $objeto->id_usuario = $datos['id_usuario'];
            $objeto->id_videojuego = $datos['id_videojuego'];
            $objeto->fecha = $datos['fecha'];
            $objeto->megusta = $datos['megusta'];
            $objeto->mensaje = $datos['mensaje'];
            $objeto->plataforma = $datos['plataforma'];
            return $objeto;
        }

        public function __toString()
        {
            return json_encode($this->atributos, JSON_UNESCAPED_UNICODE);
        }
    }