import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string;
  passwd: string;
  error: string;

  constructor(private auth: AuthServiceService, private router: Router) {}

  login() {
    this.auth.login(this.nombre, this.passwd).subscribe(
      data => {
        localStorage.setItem('token', data['token']); // Almacenar el token JWT en el almacenamiento local del navegador.
        this.router.navigate(['']); // Redireccionar al componente de inicio.
      },
      error => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    );
  }
}
