<?php
class ControladorBase
{


    /**
     * Toma el URI y lo divide en una serie de segmentos
     * 
     * @param name El nombre del método que se llamó.
     * @param arguments Una matriz de argumentos pasados al método.
     */
    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }

    /**
     * Toma la URL actual, la divide en una matriz y devuelve la matriz
     * 
     * @return Una matriz de los segmentos URI.
     */
    protected function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);
        return $uri;
    }


    /**
     * Toma la cadena de consulta de la URL y la convierte en una matriz
     * 
     * @return Una matriz de los parámetros de la cadena de consulta.
     */
    protected function getQueryStringParams()
    {
        return parse_str($_SERVER['QUERY_STRING'], $query);
    }


    /**
     * Elimina todas las cookies de la respuesta y luego envía la respuesta
     * 
     * @param data Los datos a enviar al cliente.
     * @param httpHeaders Una matriz de encabezados HTTP para enviar con la respuesta.
     */
    protected function sendOutput($data, $httpHeaders = array())
    {
        header_remove('Set-Cookie');
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        echo $data;
        exit;
    }
}
