# Despliegue

## Modo de despliegue: Nginx

<div align="center">

<img  src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" alt="Logo" width="400">

</div>  
Esta aplicación se desplegará en nuestra máquina de Arkania mediante Nginx, que destaca entre los servidores web debido a su alta configurabilidad y alto rendimiento y junto a un pequeño script de despliegue automatizaremos nuestra aplicación.

Este script actualiza la aplicación realizando un `git pull` para traer todos los cambios del repositorio al servidor. Tras esto se realiza se mueve a la carpeta del frontend para que ejecute un `npm install` y añada o actualice nuevas dependencias de Angular y para finalizar ejecuta el comando `ng build` para construir la aplicación.
