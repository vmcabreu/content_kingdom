import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
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

  suscription: Subscription;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userLogged()
    this.suscription = this.loginService.getRefresh$.subscribe(() => {
      this.userLogged();
    })
  }

  login() {
    this.loginService.loginPostUser(this.nombre, this.passwd)
      .subscribe(response => {
        if (response.status === 200) {
          this.loginService.loginGetUser(this.nombre, this.passwd)
            .subscribe((data: any) => {
              localStorage.setItem("token", data.token);
              this.loginSuccess();
            });
        } else{
          Swal.fire({
            title: "Creedenciales inválidas",
            icon: 'error',
            timerProgressBar: true,
          })
        }
      });
  }

  loginSuccess() {
    Swal.fire({
      title: '¡Inicio sesión correcto!',
      icon: 'success',
      timerProgressBar: true,
    }).then((result) => {
      this.ngOnInit();
    })
  }

  userLogged() {
    let token = localStorage.getItem('token')
    if (token !== "" && token !== undefined) {
      this.router.navigateByUrl("/");
    }
  }

}

