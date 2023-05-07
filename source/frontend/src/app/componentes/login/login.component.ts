import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  userExist: boolean = false;
  error: string;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userLogged()
  }

  login() {
    this.loginService.loginPostUser(this.nombre, this.passwd)
      .subscribe(response => {
        console.log(response.status);
        if (response.status === 200) {
          this.loginService.loginGetUser(this.nombre, this.passwd)
            .subscribe((data: any) => {
              localStorage.setItem("token", data.token);
              this.loginSuccess();
            });
        } else {
          console.log("Creedenciales inválidas");
          this.error = "Creedenciales inválidas"
        }
      });
  }

  loginSuccess() {
    Swal.fire({
      title: '¡Inicio sesión correcto!',
      icon: 'success',
      timerProgressBar: true,
    }).then((result) => {
      window.location.reload();
    })
  }

  userLogged() {
    let token = localStorage.getItem('token')
    if (token != "") {
      this.router.navigateByUrl("/");
    }
  }

}

