import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  passwd: string = '';
  userExist = false;
  error: string;

  suscription: Subscription;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userLogged();
    this.suscription = this.loginService.getRefresh$.subscribe(() => {
      this.userLogged();
    });
  }

  login() {
    this.loginService.loginPostUser(this.nombre, this.passwd).subscribe({
      next: (res: any) => {
        this.loginService.loginGetUser(this.nombre, this.passwd).subscribe({
          next: (data: any) => {
          localStorage.setItem('token', data.token);
          this.loginSuccess();
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Credenciales inválidas',
            icon: 'error',
            timerProgressBar: true,
            background: '#151515',
            color: '#fff'
          });
        }
        })
      }
    });
  }

  loginSuccess() {
    Swal.fire({
      title: '¡Inicio de sesión correcto!',
      icon: 'success',
      timerProgressBar: true,
      background: '#151515',
      color: '#fff'
    }).then((result) => {
      this.ngOnInit();
    });
  }

  userLogged() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      this.router.navigateByUrl('/');
    }
  }
}
