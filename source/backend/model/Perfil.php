    <?php

    class Perfil
    {
        private $atributos = ['id' => null, 'canales' => "", 'profile_pic' => "", 'biografica' => "", 'profesion' => "", 'id_usuario' => null];

        public function __construct(int $id = null, string $canales = "", string $profile_pic = "", string $biografica = "", string $profesion = "", int $id_usuario = null)
        {
            $this->id = $id;
            $this->canales = $canales;
            $this->profile_pic = $profile_pic;
            $this->biografica = $biografica;
            $this->profesion = $profesion;
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

        public static function crearPerfil(array $datos): Perfil
        {
            $objeto = new Perfil();
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
