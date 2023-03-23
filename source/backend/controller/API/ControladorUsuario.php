<?php
class ControladorUsuario extends ControladorBase
{

    public function queryStringParamsBool(String $param):bool{
        return isset($arrQueryStringParams[$param]) && $arrQueryStringParams[$param];
    }

    /**
     * Recibe una solicitud GET, valida el usuario y la contraseña y devuelve un objeto JSON con los
     * datos del usuario
     */
    public function loginAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new DAOUsuario();
                $user = null;
                $passwd = null;
                if ($this->queryStringParamsBool('user') && $this->queryStringParamsBool('passwd')) {
                    $user = $arrQueryStringParams['user'];
                    $passwd = $arrQueryStringParams['passwd'];
                }
                $arrUsers = $userModel->validLogUsuario($user,$passwd);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Algo fue mal';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}