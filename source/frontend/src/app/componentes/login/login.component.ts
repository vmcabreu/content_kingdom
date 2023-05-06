import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = "";
  passwd: string = "";
  error: string;

  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.loginPostUser(this.nombre, this.passwd)
      .subscribe({
        next: (v) => {
          localStorage.setItem("token", v)
          this.loginSuccess();
        },
        error: (e) => console.error(e),
      });
  }

  loginSuccess() {
    if (this.loginService.checkToken()) {
      Swal.fire({
        title: '¡Inicio sesión correcto!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,

      }).then((result) => {

        this.router.navigateByUrl("/");

        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigateByUrl("/");
          window.location.reload();
        }
      })
    }
  }






}

