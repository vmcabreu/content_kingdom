import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { Auth } from 'src/app/model/auth.model';
import { LoginService } from 'src/app/service/login.service';
import { first, map } from 'rxjs/operators';
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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

    loginGenToken() {
      this.loginService.loginPostUser(this.nombre, this.passwd)
      .subscribe({
        next: (v) => localStorage.setItem("token",v),
        error: (e) => console.error(e),});
    }
    loginGetToken() {
      this.loginService.loginGetUser(this.nombre, this.passwd)
      .subscribe((data:any) => {
        localStorage.setItem("token",data.token);

      });
    }

    loginSuccess() {
      if (this.loginService.checkToken()) {
        Swal.fire({
          title: '¡Inicio sesión correcto!',
          icon: 'success',
          timerProgressBar: true,

        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl("/");
            window.location.reload();
          }
        })
      }
    }

    login(){
      this.loginGenToken();
      if (this.loginService.checkToken()) {
        this.router.navigateByUrl("/");
      }


    }

}

