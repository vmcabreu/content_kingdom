# Deployment

## Deployment Mode: Nginx

<div align="center">

<img  src="https://www.nginx.com/wp-content/uploads/2018/08/NGINX-logo-rgb-large.png" alt="Logo" width="400">

</div>  
This application will be deployed on our Arkania machine using Nginx, which stands out among web servers due to its high configurability and performance. Along with a small deployment script, we will automate the deployment of our application.

This script updates the application by performing a `git pull` to fetch all the changes from the repository to the server. After that, it moves to the frontend folder to execute an `npm install` and add or update new dependencies of Angular. Finally, it executes the command `ng build` to build the application.

