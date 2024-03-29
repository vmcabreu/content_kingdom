    <?php
    require_once(__DIR__ . "../../../inc/bootstrap.php");
    header("Access-Control-Allow-Origin: *");
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $bearerToken = explode(' ', $headers['Authorization']);
        $token = $bearerToken[1];
        if (!$token || !Token::verifyToken($token)) {
            http_response_code(401);
            exit(json_encode(array("message" => "Acceso denegado")));
        }
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);
                $likesUsuario = DAOLikes::getLikesFromUsuarios($id);
                if ($likesUsuario != null) {
                    http_response_code(200);
                    echo json_encode($likesUsuario,JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "No se encontró likes del usuario con ID " . $id));
                }
            } elseif (isset($_GET['post'])) {
                $post = intval($_GET['post']);
                $likesPost = DAOLikes::getLikesFromPublicacion($post);
                if ($likesPost != null) {
                    http_response_code(200);
                    echo json_encode($likesPost,JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "No se encontró likes de las publicaciones con ID " . $post),JSON_UNESCAPED_UNICODE);
                }
            } else {
                $listLikes = DAOLikes::getListOfLikes();
                if ($listLikes != null) {
                    http_response_code(200);
                    echo json_encode($listLikes,JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(404);
                    echo json_encode(array("message" => "No se encontró likes de las publicaciones"),JSON_UNESCAPED_UNICODE);
                }
            }
        } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $json = file_get_contents('php://input');
            $array = json_decode($json, true);
            if (DAOLikes::addLike(Likes::crearLikes($array))) {
                http_response_code(200);
            } else {
                http_response_code(422);
            }
        } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            if (isset($_GET['id']) && isset($_GET['post'])) {
                $id = intval($_GET['id']);
                $post = intval($_GET['post']);
                $respuestaDelete = DAOLikes::deleteLike($id, $post);
                $httpCode = $respuestaDelete > 0 ? 200 : 422;
                echo json_encode(array("respuesta" => $respuestaDelete),JSON_UNESCAPED_UNICODE);
                http_response_code($httpCode);
                return;
            }
        }
    }
