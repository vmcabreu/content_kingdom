<?php 
require_once __DIR__."/inc/bootstrap.php";
require_once "./model/DAOUsuario.php";
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET['id']))
    {
      //Mostrar un post
      header("Content-Type: application/json");
      echo json_encode(DAOUsuario::buscarUsuario(intval($_GET['id'])));
	  }
    /** 
    else {
      //Mostrar lista de post
      header("HTTP/1.1 200 OK");
      echo json_encode(DAOUsuario::(intval($_GET['id'])));
      exit();
	}
    */
}


?>