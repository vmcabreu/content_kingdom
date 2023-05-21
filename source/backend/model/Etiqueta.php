    <?php

    class Etiqueta
    {
        private $atributos = ['id' => null, 'nombre' => ""];

        public function __construct(int $id = null, string $nombre = "")
        {
            $this->id = $id;
            $this->nombre = $nombre;
        }

        public function __set(string $atributo, mixed $valor)
        {
            $this->atributos[$atributo] = $valor;
        }

        public function __get(string $atributo)
        {
            return $this->atributos[$atributo];
        }

        public static function crearPerfil(array $datos): Etiqueta
        {
            $objeto = new Etiqueta();
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
